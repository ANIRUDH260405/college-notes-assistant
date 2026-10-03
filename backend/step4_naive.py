import sys
from loader import load_all_notes
from llm import ask_llm

# Optional: repeat the notes N times to simulate a much bigger notes collection
multiplier = int(sys.argv[1]) if len(sys.argv) > 1 else 1

docs = load_all_notes()
full_text = "\n\n".join(f"=== {name} ===\n{text}" for name, text in docs.items())
full_text = (full_text + "\n\n") * multiplier

print("Notes multiplier:", multiplier)
print("Characters sent :", len(full_text))
print("Approx tokens   :", len(full_text) // 4)
print("-" * 40)

try:
    print(ask_llm("Explain normalization from my DBMS notes.", full_text))
except Exception as e:
    print("FAILED:", type(e).__name__)
    print(str(e)[:400])
