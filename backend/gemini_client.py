import google.generativeai as genai
import os
from sentence_transformers import SentenceTransformer
import numpy as np

# Load API key
api_key = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=api_key)

print("Loaded GOOGLE_API_KEY:", api_key)

# 🔥 Rewrite model (Gemini)
rewrite_model = genai.GenerativeModel("gemini-2.5-pro")

# 🔥 Local embedding model (SentenceTransformers)
embedder = SentenceTransformer("all-MiniLM-L6-v2")

def rewrite_query_for_embedding(prompt: str) -> str:
    """Rewrite user query into a clean semantic search query."""
    instruction = (
        "Rewrite this query for semantic search. "
        "Keep it short, direct, and remove story, emotion, and filler. "
        "Keep only keywords related to attack technique or payload intent. "
        "Return ONLY the rewritten query.\n\n"
        f"Query: {prompt}"
    )
    response = rewrite_model.generate_content(instruction)
    return response.text.strip()

def create_embedding(text: str):
    """Return a normalized 384-d embedding vector."""
    vec = embedder.encode(text, convert_to_numpy=True, normalize_embeddings=True)
    return vec.tolist()

def generate_text(prompt: str) -> str:
    """Simple Gemini text generation wrapper."""
    response = rewrite_model.generate_content(prompt)
    return response.text
