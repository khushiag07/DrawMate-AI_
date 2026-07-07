import ollama
import json
from vector_store import search_knowledge, add_knowledge
from knowledge_agent import get_drawing_knowledge
from chat_memory import (
    save_chat,
    get_chat_context
)
from image.image_agent import generate_step_images
import os

SCHEMA = """
{
  "type": "lesson",
  "goal": "",
  "materials": [],
  "difficulty": "",
  "generate_images": true,


  "milestones": [
    {
      "title": "",
      "description": ""
    },
    {
      "title": "",
      "description": ""
    },
    {
      "title": "",
      "description": ""
    },
    {
      "title": "",
      "description": ""
    }
  ],

  "steps": [],
  "tips": [],
  "mistakes": [],
  "practice": "",
  "next_lesson": ""
}
"""

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

Generate EXACTLY 4 milestones.

Each milestone should represent one important stage of the drawing process.

The milestones should build naturally from start to finish.

Each milestone description should be less than 30 words.

The response must follow this JSON schema exactly.

Schema:

{SCHEMA}

Rules:

- steps must be an array.
- tips must be an array.
- mistakes must be an array.
- materials must be an array.
- milestones must contain exactly 4 objects.
- Return ONLY JSON.
- Do NOT include markdown.
- Do NOT wrap the response inside ```.
First determine the user's intent.

If the user is greeting, chatting, thanking you, asking about yourself,
or asking a non-drawing question:

Return:

{{
  "type": "chat",
  "reply": "...",
  "generate_images": false
}}

If the user is asking to learn drawing, sketching, anatomy, shading,
perspective, painting, or any art topic:

Return:

{{
  "type": "lesson",
  ...
}}
Image Rules:

- If the user wants to learn drawing or needs visual guidance, set
  "generate_images": true.

Examples:
- Draw an eye
- Teach me perspective
- How to draw a cat
- Draw anime hair
- Show me shading
- Sketch a rose

For greetings or normal conversation, set
"generate_images": false.

Examples:
- Hi
- Hello
- Who are you?
- Thank you
- What's your name?
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
        if lesson.get("type") == "chat":

            save_chat(
                question,
                lesson.get("reply", "")
            )

            return {
                "type": "chat",
                "reply": lesson.get("reply", ""),
                "images": []
            }
    except Exception:
        lesson = {
            "goal": "Drawing Lesson",
            "materials": [],
            "difficulty": "Unknown",
            "generate_images": False,
            "milestones": [],
            "steps": [],
            "tips": [],
            "mistakes": [],
            "practice": raw_answer,
            "next_lesson": ""
        }

    milestones = lesson.get("milestones", [])

    if not milestones:
        milestones = [
            {
                "title": "Basic Shape",
                "description": f"Draw the basic construction of {question}."
            },
            {
                "title": "Main Outline",
                "description": f"Add the main outline of {question}."
            },
            {
                "title": "Details",
                "description": f"Add important details to {question}."
            },
            {
                "title": "Final Drawing",
                "description": f"Finish and shade the {question}."
            }
        ]
    generate_images = lesson.get("generate_images", False)

    image_paths = []

    if generate_images:
        try:
            image_paths = generate_step_images(
                question,
                milestones
            )
        except Exception as e:
            print("Image Generation Error:", e)

    image_urls = [
        f"http://localhost:8000/{path.replace(os.sep, '/')}"
        for path in image_paths
    ]

    save_chat(
        question,
        json.dumps(lesson, indent=2)
    )

    return {
        "type": "lesson",
        "lesson": lesson,
        "images": image_urls
}