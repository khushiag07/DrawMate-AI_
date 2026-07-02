import ollama
from memory_agent import update_memory


def analyze_drawing(image_path):

    prompt = """
You are DrawMate Vision AI.

Analyze this drawing like a professional art teacher.

Give:

1. Overall Score /100

2. Strengths

3. Mistakes:
- proportion
- perspective
- anatomy
- shading
- line quality

4. How to improve

5. Next practice exercise

Be supportive and beginner friendly.
"""


    response = ollama.chat(
        model="llava",
        messages=[
            {
                "role":"user",
                "content":prompt,
                "images":[image_path]
            }
        ]
    )
    update_memory(
    strengths=[
        "creativity"
    ],

    weaknesses=[
        "needs practice based on last sketch"
    ]
)


    return response["message"]["content"]