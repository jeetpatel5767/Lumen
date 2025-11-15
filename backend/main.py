from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import os
import re
import json

# Load .env from project root
load_dotenv()

# helpers from other modules
from .gemini_client import rewrite_query_for_embedding, create_embedding, generate_text
from .milvus_client import search_top1

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # your frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Safety toggle: payload text is redacted by default.
# To allow returning raw payload strings set ALLOW_PAYLOADS=true in your root .env
ALLOW_PAYLOADS = os.getenv("ALLOW_PAYLOADS", "false").lower() in ("1", "true", "yes")


class GenerateRequest(BaseModel):
    prompt: str


def sanitize_single_line(text: str) -> str:
    if not text:
        return ""
    text = text.strip()
    if (text.startswith('"') and text.endswith('"')) or (text.startswith("'") and text.endswith("'")):
        text = text[1:-1].strip()
    text = re.sub(r'[\r\n\t]+', ' ', text)
    text = re.sub(r'\s{2,}', ' ', text)
    text = re.sub(r'\s*,\s*', ', ', text)
    text = text.strip(' .;,:')
    return text.strip()


def redact_payloads_in_record(raw_record: dict) -> dict:
    """
    Return a deep-copy of raw_record with any direct 'payload' fields redacted.
    We do minimal traversal for variants[].payload.
    """
    rr = json.loads(json.dumps(raw_record)) if raw_record else {}
    variants = rr.get("variants", [])
    for v in variants:
        if "payload" in v:
            v["payload"] = "[REDACTED]"
    rr["variants"] = variants
    return rr


def format_final_answer(raw_data: dict) -> str:
    """
    Use Gemini to format into a short, readable payload-cheatsheet.
    If Gemini fails (quota or error), main flow will fallback to local_format_raw.
    """
    # If we are redacting by default, redact payloads in the provided data
    data_for_prompt = raw_data if ALLOW_PAYLOADS else redact_payloads_in_record(raw_data)

    format_prompt = f"""
Format the following attack data into a clean, short, practical output.

Rules:
- Keep it short and readable (~8-14 lines).
- Do NOT produce a long security advisory.
- DO NOT include references or long mitigation sections.
- Only include these sections (in this order):
  1) One-line title (what this is)
  2) Payload(s) — if any; if redacted, show "[REDACTED]"
  3) One-line explanation (1–2 sentences)
  4) Where it works (OS / system)
  5) Short notes (2 bullets max)
- Tone: simple, practical, friendly.
- Output as plain text only, no JSON or extra commentary.

Data:
{json.dumps(data_for_prompt, indent=2)}
"""
    return generate_text(format_prompt)


def local_format_raw(raw_json: dict) -> str:
    """
    Local fallback that creates a short, readable payload-cheatsheet without calling Gemini.
    Keeps payloads redacted unless ALLOW_PAYLOADS is true.
    """
    if not raw_json:
        return "No matching data found."

    imp = raw_json.get("important", {})
    title = imp.get("title", "No title")
    targets = imp.get("targets", {})
    os_vals = targets.get("os", []) if isinstance(targets, dict) else []
    sys_vals = targets.get("system", []) if isinstance(targets, dict) else []

    # Variants — show notes and payload or redacted payload depending on ALLOW_PAYLOADS
    variants = raw_json.get("variants", [])
    variant_lines = []
    for v in variants:
        notes = v.get("notes", "")
        payload = v.get("payload", None)
        if payload and ALLOW_PAYLOADS:
            variant_lines.append(f"- {payload} ({notes})" if notes else f"- {payload}")
        elif payload:
            variant_lines.append(f"- [REDACTED] ({notes})" if notes else "- [REDACTED]")
        elif notes:
            variant_lines.append(f"- {notes}")

    # Short usage notes (no raw steps/payloads)
    usage = raw_json.get("usage", {})
    steps = usage.get("steps", [])
    short_steps = steps[:2] if steps else []

    parts = []
    parts.append(f"{title}")
    # payload block (show first variant payload or redacted if present)
    if variant_lines:
        parts.append("")  # blank line for separation
        parts.append("Payload(s):")
        parts.extend(variant_lines[:3])  # up to 3 variants
    else:
        parts.append("")
        parts.append("Payload(s):")
        parts.append("- [REDACTED]")

    # Explanation
    parts.append("")
    parts.append("Explanation:")
    parts.append("This input manipulates the SQL logic so the authentication check can evaluate as true, allowing bypass of the password check.")

    # Where it works
    parts.append("")
    where = []
    if os_vals:
        where.append("OS: " + ", ".join(os_vals))
    if sys_vals:
        where.append("System: " + ", ".join(sys_vals))
    if where:
        parts.append("Works on: " + " | ".join(where))

    # Notes
    if short_steps or raw_json.get("usage", {}).get("mitigations"):
        parts.append("")
        parts.append("Notes:")
        for s in short_steps:
            parts.append(f"• {s}")
        # add a short safe mitigation hint (very short)
        mitigations = usage.get("mitigations", [])
        if mitigations:
            parts.append(f"• Mitigation hint: {mitigations[0]}")

    return "\n".join(parts)


@app.post("/generate")
async def generate(data: GenerateRequest):
    # 1) Rewrite prompt for embedding (Gemini)
    rewritten_raw = rewrite_query_for_embedding(data.prompt)
    rewritten = sanitize_single_line(rewritten_raw)

    # 2) Create embedding vector
    embedding_vector = create_embedding(rewritten)

    # 3) Search Milvus top-1
    search_result = search_top1(embedding_vector, top_k=1)
    if not search_result:
        return {
            "prompt_received": data.prompt,
            "rewritten_query": rewritten,
            "final_answer": None,
            "raw": None,
            "note": "No matching payload found in Milvus."
        }

    hit_id, distance, raw_json = search_result

    # 4) Format final answer — prefer Gemini, fallback to local formatter
    final_text = None
    # If payloads should be redacted, send redacted data to Gemini prompt
    try:
        final_text = format_final_answer(raw_json)
    except Exception as e:
        # generate_text can return None for quota or raise; treat both as fallback
        print("Gemini formatting failed or returned None:", str(e))
        final_text = None

    if not final_text:
        final_text = local_format_raw(raw_json)

    response = {
        "prompt_received": data.prompt,
        "rewritten_query": rewritten,
        "milvus_hit_id": hit_id,
        "score": distance,
        "final_answer": final_text,
        "raw": raw_json if ALLOW_PAYLOADS else "REDACTED (set ALLOW_PAYLOADS=true to include raw payloads)"
    }
    return response
