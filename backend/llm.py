import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# Check console.groq.com/docs/models for currently available models
MODEL = "openai/gpt-oss-120b"

SYSTEM_PROMPT = (
    "You are a college notes assistant. Answer ONLY using the NOTES provided. "
    "If the answer is not in the notes, say: 'I couldn't find this in your notes.' "
    "Explain clearly, like a good tutor."
)

def ask_llm(question: str, context: str = "") -> str:
    user_msg = f"NOTES:\n{context}\n\nQUESTION: {question}" if context else question
    resp = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_msg},
        ],
        temperature=0.2,
    )
    return resp.choices[0].message.content
