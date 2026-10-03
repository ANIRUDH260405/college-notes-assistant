import sys
from loader import load_all_notes
from retriever import top_chunks
from llm import ask_llm

q = sys.argv[1] if len(sys.argv) > 1 else "Explain normalization from my DBMS notes"

docs = load_all_notes()
hits = top_chunks(q, docs)

print("Question:", q)
print("Chunks retrieved:", len(hits))
for s, n, i, c in hits:
    print(f"  score={s}  {n}  chunk {i}")

context = "\n\n".join(f"[{n} | chunk {i}]\n{c}" for s, n, i, c in hits)
print("Context size (chars):", len(context))
print("-" * 40)
print(ask_llm(q, context))
