import wikipedia
import requests
from bs4 import BeautifulSoup


def get_wikipedia_knowledge(topic: str) -> str:
    try:
        wikipedia.set_lang("en")
        search_results = wikipedia.search(topic, results=3)

        if not search_results:
            return ""

        content = []
        for title in search_results:
            try:
                page = wikipedia.page(title, auto_suggest=False)
                content.append(f"Title: {page.title}\n{page.summary}")
            except Exception:
                continue

        return "\n\n".join(content)

    except Exception as e:
        return f"Error fetching Wikipedia data: {str(e)}"


def get_webpage_text(url: str) -> str:
    try:
        response = requests.get(url, timeout=10)
        soup = BeautifulSoup(response.text, "html.parser")

        for tag in soup(["script", "style", "nav", "footer", "header"]):
            tag.decompose()

        text = soup.get_text(separator=" ")
        return " ".join(text.split())

    except Exception as e:
        return f"Error fetching webpage: {str(e)}"