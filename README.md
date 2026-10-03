# College Notes Assistant

Ask questions about your college notes (PDF and TXT) and get answers grounded in your own documents.

## How it works

Notes (PDF/TXT) -> Extract text -> Chunk -> Score chunks by keyword -> Build prompt -> Groq LLM -> Answer

- `loader.py` parses PDFs (pypdf) and text files
- `retriever.py` splits text into overlapping chunks and picks the most relevant ones
- `llm.py` builds the prompt and calls the Groq API
- `app.py` is a FastAPI server with `/files` and `/ask`
- `frontend/` is a React (Vite) chat UI that also shows which chunks were sent to the LLM

## Run it

### Backend

    cd backend
    python -m venv venv
    .\venv\Scripts\Activate.ps1
    pip install -r requirements.txt
    python gen_notes.py
    uvicorn app:app --port 8000

Create `backend/.env` containing `GROQ_API_KEY=your_key` (get one at console.groq.com).
Put your own PDFs or TXT files in `backend/notes/`, or run `gen_notes.py` for sample notes.

### Frontend

    cd frontend
    npm install
    npm run dev

Open http://localhost:5173

## What I learned

- PDF parsing and text extraction
- Why sending whole documents to an LLM fails (context window and rate limits)
- Chunking, retrieval and prompt construction
- Building a REST API and connecting it to a React frontend

## Known limitation and next step

Keyword retrieval misses synonyms ("remove redundancy" will not match "normalization").
Next: replace `top_chunks()` with embedding-based semantic search.
