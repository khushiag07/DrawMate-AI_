import wikipedia
import requests
from bs4 import BeautifulSoup
from vector_store import search_knowledge


def get_wikipedia_knowledge(topic: str) -> str:
    """
    Fetch knowledge from Wikipedia.
    """
    try:
        wikipedia.set_lang("en")
        search_results = wikipedia.search(topic, results=3)

        if not search_results:
            return ""

        content = []

        for title in search_results:
            try:
                page = wikipedia.page(title, auto_suggest=False)
                content.append(
                    f"Title: {page.title}\n{page.summary}"
                )
            except Exception:
                continue

        return "\n\n".join(content)

    except Exception as e:
        return f"Error fetching Wikipedia: {e}"


def get_drawing_knowledge(topic: str) -> str:
    """
    First search ChromaDB.
    If nothing is found, use Wikipedia.
    """
    context = search_knowledge(topic)

    if context.strip():
        return context

    return get_wikipedia_knowledge(topic)


def get_webpage_text(url: str) -> str:
    try:
        response = requests.get(url, timeout=10)

        soup = BeautifulSoup(response.text, "html.parser")

        for tag in soup(["script", "style", "nav", "footer", "header"]):
            tag.decompose()

        text = soup.get_text(separator=" ")

        return " ".join(text.split())

    except Exception as e:
        return f"Error fetching webpage: {e}"