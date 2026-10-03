from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from loader import load_all_notes
from retriever import top_chunks
from llm import ask_llm

app = FastAPI(title="College Notes Assistant")

# Lets the React dev server (port 5173) call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

docs = load_all_notes()

class Question(BaseModel):
    question: str

@app.get("/files")
def files():
    return {"files": [{"name": n, "chars": len(t)} for n, t in docs.items()]}

@app.post("/ask")
def ask(req: Question):
    hits = top_chunks(req.question, docs)
    if not hits:
        return {
            "answer": "I couldn't find anything relevant in your notes.",
            "sources": [],
            "context_chars": 0,
        }

    context = "\n\n".join(f"[{n} | chunk {i}]\n{c}" for s, n, i, c in hits)
    answer = ask_llm(req.question, context)
    sources = [
        {"file": n, "chunk": i, "score": s, "preview": c[:220]}
        for s, n, i, c in hits
    ]
    return {"answer": answer, "sources": sources, "context_chars": len(context)}
