import chromadb
from sentence_transformers import SentenceTransformer

client = chromadb.PersistentClient(path="./chroma_db")
collection = client.get_or_create_collection(name="drawmate_knowledge")

model = SentenceTransformer("all-MiniLM-L6-v2")


def chunk_text(text: str, chunk_size: int = 700):
    words = text.split()
    chunks = []

    for i in range(0, len(words), chunk_size):
        chunks.append(" ".join(words[i:i + chunk_size]))

    return chunks


def add_knowledge(text: str, source: str):
    chunks = chunk_text(text)

    for index, chunk in enumerate(chunks):
        embedding = model.encode(chunk).tolist()

        collection.add(
            ids=[f"{source}_{index}"],
            embeddings=[embedding],
            documents=[chunk],
            metadatas=[{"source": source}],
        )

    return len(chunks)


def search_knowledge(query: str, n_results: int = 3):
    query_embedding = model.encode(query).tolist()

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=n_results,
    )

    documents = results.get("documents", [[]])[0]
    metadatas = results.get("metadatas", [[]])[0]

    if not documents:
        return ""

    final_context = []

    for doc, meta in zip(documents, metadatas):
        source = meta.get("source", "unknown")
        book = meta.get("book", "Unknown Book")

        final_context.append(
            f"Book: {book}\n"
            f"Source: {source}\n"
            f"Content:\n{doc}"
        )

    return "\n\n---\n\n".join(final_context)
