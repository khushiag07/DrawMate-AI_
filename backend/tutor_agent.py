import ollama
import json
from vector_store import search_knowledge, add_knowledge
from knowledge_agent import get_drawing_knowledge
from chat_memory import (
    save_chat,
    get_chat_context
)
from image.image_agent import generate_tutorial_image

def ask_drawmate(question: str) :
    context = search_knowledge(question)
    print("\n==========================")
    print("Retrieved Context")
    print("==========================")
    print(context[:1200])
    print("==========================\n")
    chat_history = get_chat_context()

    if not context.strip():
        context = get_drawing_knowledge(question)

    # Store only Wikipedia fallback results
        if context and "Source:" not in context:
            add_knowledge(
                context,
                source=question.replace(" ", "_")[:50]
            )

            context = search_knowledge(question)
    prompt = f"""
You are DrawMate AI, an expert drawing instructor.

Teach the user using the retrieved knowledge.

Never copy the retrieved text.

If the retrieved knowledge is poor, use your own drawing knowledge.

Return ONLY valid JSON.

Use exactly this schema:

{{
  "goal": "",
  "materials": [],
  "difficulty": "",
  "steps": [],
  "tips": [],
  "mistakes": [],
  "practice": "",
  "next_lesson": ""
}}

Rules:

- steps must be an array.
- tips must be an array.
- mistakes must be an array.
- materials must be an array.
- Do not return markdown.
- Do not wrap the JSON in ```.

Retrieved Knowledge:
{context}

Previous Conversation:
{chat_history}

User Question:
{question}
"""
    response = ollama.chat(
        model="llama3.2",
        messages=[
            {"role": "user", "content": prompt}
        ]
        
        
    )
    raw_answer = response["message"]["content"].strip()

    if raw_answer.startswith("```"):
        raw_answer = raw_answer.replace("```json", "")
        raw_answer = raw_answer.replace("```", "")
        raw_answer = raw_answer.strip()

    try:
        lesson = json.loads(raw_answer)
        
    except Exception:
        lesson = {
            "goal": "",
            "materials": [],
            "difficulty": "",
            "steps": [],
            "tips": [],
            "mistakes": [],
            "practice": raw_answer,
            "next_lesson": ""
        }
    steps = lesson.get("steps", [])

    if not isinstance(steps, list):
        steps = [str(steps)]

    steps_text = "\n".join(steps)

    image_path = generate_tutorial_image(
        question,
        steps_text
    )

    save_chat(
        question,
        json.dumps(lesson, indent=2)
    )

    return {
        "lesson": lesson,
        "image_path": image_path
    }