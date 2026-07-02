import ollama
from vector_store import search_knowledge


def create_drawing_breakdown(topic: str) -> str:
    context = search_knowledge(topic)

    prompt = f"""
You are DrawMate AI, an expert art mentor.

Create a drawing breakdown for:
{topic}

Use this knowledge if helpful:
{context}

Give output in this format:

1. Difficulty Level
2. Basic Shapes Needed
3. Step-by-Step Breakdown
4. Common Mistakes
5. Practice Exercise
6. Estimated Time to Learn

Make it beginner-friendly and practical.
"""

    response = ollama.chat(
        model="llama3.2",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    return response["message"]["content"]