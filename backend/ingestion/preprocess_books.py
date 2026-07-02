import fitz
import os

BOOK_FOLDER = "../data/books"
def chunk_text(text, size=500):

    words = text.split()

    chunks = []

    for i in range(0, len(words), size):
        chunks.append(" ".join(words[i:i+size]))

    return chunks
def extract_pdf(pdf_path):
    doc = fitz.open(pdf_path)

    text = ""

    for page in doc:
        text += page.get_text()

    return text


for file in os.listdir(BOOK_FOLDER):

    if file.endswith(".pdf"):

        text = extract_pdf(os.path.join(BOOK_FOLDER, file))

        print(file)
        print(text[:500])