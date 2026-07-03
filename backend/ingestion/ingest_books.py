import os
import sys
# Add backend folder to Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
import uuid
import fitz  # PyMuPDF
from ebooklib import epub
from bs4 import BeautifulSoup
from sentence_transformers import SentenceTransformer
from vector_store import collection

# Folder containing PDFs
BOOK_FOLDER = "data/books"

# Embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")


def extract_text(pdf_path):
    """Extract text from a PDF."""
    document = fitz.open(pdf_path)
    text = ""

    for page in document:
        text += page.get_text()

    return text


def chunk_text(text, chunk_size=500):
    """Split text into chunks."""
    words = text.split()

    chunks = []

    for i in range(0, len(words), chunk_size):
        chunks.append(" ".join(words[i:i + chunk_size]))

    return chunks

def extract_epub(epub_path):
    book = epub.read_epub(epub_path)
    text = ""

    for item in book.get_items():
        if item.get_type() == 9:  # EPUB document
            soup = BeautifulSoup(item.get_content(), "html.parser")
            text += soup.get_text(separator=" ", strip=True)

    return text

def book_already_exists(book_name):
    results = collection.get(
        where={"book": book_name}
    )

    return len(results["ids"]) > 0


def ingest_books():

    files = [
        f for f in os.listdir(BOOK_FOLDER)
        if f.endswith(".pdf") or f.endswith(".epub")
    ]

    print(f"Found {len(files)} books")

    for file in files:

        print(f"\nProcessing {file}")
        if book_already_exists(file):
            print(f"⏩ {file} already exists. Skipping...")
            continue

        file_path = os.path.join(BOOK_FOLDER, file)

        if file.endswith(".pdf"):
            text = extract_text(file_path)

        elif file.endswith(".epub"):
            text = extract_epub(file_path)

        else:
            continue

        chunks = chunk_text(text)

        print(f"Chunks: {len(chunks)}")

        for chunk in chunks:

            embedding = model.encode(chunk).tolist()

            collection.add(
                ids=[str(uuid.uuid4())],
                documents=[chunk],
                embeddings=[embedding],
                metadatas=[{
                    "book": file,
                    "source": "drawing_book",
                    "type": "book",
                    "language": "en",
                    "difficulty": "beginner"
                }]
            )

    print("\n✅ All books added to ChromaDB!")

if __name__ == "__main__":
    ingest_books()


