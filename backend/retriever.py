import re

STOPWORDS = {"the","a","an","is","are","of","to","in","and","from","my","me","explain",
             "what","how","notes","about","give","tell","on","for","with","this","that"}

def chunk_text(text: str, size: int = 1000, overlap: int = 200):
    chunks, start = [], 0
    while start < len(text):
        chunks.append(text[start:start + size])
        start += size - overlap
    return chunks

def tokenize(s: str) -> set:
    return {w for w in re.findall(r"\w+", s.lower()) if w not in STOPWORDS}

def top_chunks(question: str, docs: dict, k: int = 4):
    q_words = tokenize(question)
    scored = []
    for name, text in docs.items():
        for i, chunk in enumerate(chunk_text(text)):
            score = len(q_words & tokenize(chunk))
            if score > 0:
                scored.append((score, name, i, chunk))
    scored.sort(key=lambda x: x[0], reverse=True)
    return scored[:k]
