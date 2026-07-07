import ollama
import json

INTENT_PROMPT = """
You are an intent classifier for DrawMate AI.

Classify the user's message into ONE of these intents only.

chat
lesson
roadmap
challenge
breakdown

Rules:

chat
- greetings
- introductions
- casual conversation
- thanks
- jokes
- who are you
- coding questions
- math questions
- anything NOT related to learning drawing

lesson
- how to draw
- teach me
- draw
- sketch
- shading
- anatomy
- perspective
- watercolor
- digital painting
- pencil drawing
- tutorials

roadmap
- learning plan
- roadmap
- become good
- master drawing
- study plan

challenge
- give practice
- drawing challenge
- daily task
- assignment

breakdown
- break down this drawing
- explain each step
- milestone
- decomposition

Return ONLY JSON.

{
    "intent":"chat"
}
"""

def classify_intent(message: str):

    response = ollama.chat(
        model="llama3.2",
        messages=[
            {
                "role":"user",
                "content":INTENT_PROMPT + "\n\nUser:\n" + message
            }
        ]
    )

    try:
        return json.loads(
            response["message"]["content"]
        )["intent"]

    except Exception:
        return "chat"