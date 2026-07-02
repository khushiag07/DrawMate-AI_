import ollama
from memory_agent import load_memory


def generate_challenge():
    user_memory = load_memory()

    prompt = f"""
You are DrawMate AI Challenge Agent.

Create one daily drawing challenge for the user.

Use this user memory:
{user_memory}

Challenge format:

1. Challenge Title
2. Level
3. Time Needed
4. Drawing Task
5. Steps
6. Success Criteria
7. XP Reward

Make it fun, practical, and based on user's weaknesses.
"""

    response = ollama.chat(
        model="llama3.2",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response["message"]["content"]