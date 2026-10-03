from pathlib import Path
from pypdf import PdfReader

NOTES_DIR = Path(__file__).parent / "notes"

def read_pdf(path) -> str:
    reader = PdfReader(path)
    return "\n".join((page.extract_text() or "") for page in reader.pages)

def read_txt(path) -> str:
    return Path(path).read_text(encoding="utf-8", errors="ignore")

def load_all_notes() -> dict:
    docs = {}
    for f in NOTES_DIR.iterdir():
        if f.suffix.lower() == ".pdf":
            docs[f.name] = read_pdf(f)
        elif f.suffix.lower() == ".txt":
            docs[f.name] = read_txt(f)
    return docs
