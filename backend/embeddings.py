from sentence_transformers import SentenceTransformer
import numpy as np

# Load the model once (best practice)
model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

def embed_text(text: str):
    """
    Convert text into a normalized embedding vector.
    Returns a Python list of floats with 384 dimensions.
    """

    # Generate embedding as numpy array
    vec = model.encode(
        text,
        convert_to_numpy=True,
        normalize_embeddings=True,       # Same as your script
        show_progress_bar=False
    )

    return vec.tolist()
