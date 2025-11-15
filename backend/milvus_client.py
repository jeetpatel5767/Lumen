# backend/milvus_client.py
import os
from pymilvus import connections, Collection, MilvusException
from typing import Optional, Tuple

MILVUS_HOST = os.getenv("MILVUS_HOST", "milvus-standalone")
MILVUS_PORT = os.getenv("MILVUS_PORT", "19530")
COLLECTION_NAME = os.getenv("MILVUS_COLLECTION", "attacks_v2")

def connect_if_needed():
    # safe idempotent connect
    try:
        connections.connect(alias="default")
    except Exception:
        connections.connect(alias="default", host=MILVUS_HOST, port=MILVUS_PORT)

def _do_search_with_metric(collection: Collection, vector: list, metric: str, top_k: int = 1):
    # nprobe is common; adjust if you have tuned index params
    params = {"metric_type": metric, "params": {"nprobe": 10}}
    return collection.search([vector], "embedding", param=params, limit=top_k, output_fields=["id"])

def search_top1(vector: list, top_k: int = 1) -> Optional[Tuple[str, float, dict]]:
    """
    Search and return (id, distance/score, raw_json) or None.
    Tries COSINE first (typical), falls back to IP if needed.
    """
    connect_if_needed()
    collection = Collection(COLLECTION_NAME)

    # Try COSINE first (most common for normalized vectors)
    for metric in ("COSINE", "IP"):
        try:
            results = _do_search_with_metric(collection, vector, metric, top_k=top_k)
            # if success, parse results
            if not results or len(results[0]) == 0:
                return None
            first_hit = results[0][0]
            hit_id = first_hit.id
            distance = getattr(first_hit, "distance", None)
            if distance is None:
                distance = getattr(first_hit, "score", None)

            # fetch raw record by id
            expr = f'id == "{hit_id}"'
            records = collection.query(expr, output_fields=[
                "raw", "id", "title", "category", "sub_category", "risk", "tags", "os", "system"
            ])
            raw = records[0].get("raw", {}) if records else {}
            return (str(hit_id), distance, raw)

        except MilvusException as e:
            # if message indicates metric mismatch, try next metric
            msg = str(e)
            if "metric type not match" in msg or "expected=COSINE" in msg.lower() or "expected=IP" in msg.lower():
                # try next metric in loop
                continue
            # other errors -> re-raise
            raise

    # if both fail or no hits
    return None
