def build_rewrite_prompt(user_prompt: str) -> str:
    """
    Build an instruction that makes Gemini output exactly the embedding format
    used in Milvus: a single flat sentence of VALUES ONLY (no field names).
    """
    return f"""
You help convert the user's natural language query into an embedding text
that matches our stored 'important' JSON values.

IMPORTANT:
Our Milvus embeddings DO NOT include field names.
We only embed the VALUES from the JSON "important" section, flattened into one sentence.

EXAMPLE OF CORRECT OUTPUT:
"sql injection login bypass sql injection authentication bypass database login auth sql windows linux mysql mssql medium"

RULES:
- Output ONLY the relevant VALUES as plain text.
- NO field names (no title:, no category:, no tags:, no system:).
- NO commas, NO colons.
- NO JSON, NO lists, NO extra formatting.
- Only a SINGLE LINE of plain text.
- Words should be space-separated.
- All lowercase.
- Include only values related to the user's query (OS, DB, attack type, etc).
- NEVER add newlines.

User query:
{user_prompt}

Now produce the embedding text:
"""
