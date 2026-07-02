import os
import sys
# Add backend folder to Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
import uuid
import fitz  # PyMuPDF

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


def ingest_books():

    files = [f for f in os.listdir(BOOK_FOLDER) if f.endswith(".pdf")]

    print(f"Found {len(files)} books")

    for file in files:

        print(f"\nProcessing {file}")

        pdf_path = os.path.join(BOOK_FOLDER, file)

        text = extract_text(pdf_path)

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
                    "source": "drawing_book"
                }]
            )

    print("\n✅ All books added to ChromaDB!")


if __name__ == "__main__":
    ingest_books()