import ollama
from vector_store import search_knowledge, add_knowledge
from knowledge_agent import get_wikipedia_knowledge
from chat_memory import (
    save_chat,
    get_chat_context
)


def ask_drawmate(question: str) -> str:
    context = search_knowledge(question)
    chat_history = get_chat_context()

    if not context or len(context.strip()) < 200:
        online_text = get_wikipedia_knowledge(question)
        if online_text:
            add_knowledge(online_text, source=question.replace(" ", "_")[:50])
            context = search_knowledge(question)

    prompt = f"""
You are DrawMate AI, a friendly AI drawing mentor.

Behavior:
- Talk naturally, like a supportive teacher
- Keep answers simple and practical
- For drawing questions, break the answer into clear steps
- Use beginner-friendly language
- Ask one helpful follow-up question when needed
- For normal questions, answer briefly and naturally
- Do not over-explain unless user asks
Rules:
- Use retrieved drawing knowledge only when it is useful
- If retrieved knowledge is weak or unrelated, still answer using general drawing knowledge
- Never copy raw source text directly
- Convert information into simple teaching steps

User question:
{question}

Relevant drawing knowledge:
{context}

Previous conversation:
{chat_history}
Answer:
"""

    response = ollama.chat(
        model="llama3.2",
        messages=[
            {"role": "user", "content": prompt}
        ]
        
        
    )
    answer = response["message"]["content"]

    save_chat(
    question,
    answer
)

    return answer

   


