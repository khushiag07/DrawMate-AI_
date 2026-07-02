import ollama
from vector_store import search_knowledge
from memory_agent import load_memory


def generate_roadmap(goal):

    knowledge = search_knowledge(goal)

    user_memory = load_memory()


    prompt = f"""
You are DrawMate AI Roadmap Agent.

Create a personalized drawing learning roadmap.

User Goal:
{goal}


User Current Data:
{user_memory}


Drawing Knowledge:
{knowledge}


Create:

1. Skill Level Analysis

2. 30 Day Learning Plan

Week wise:
Week 1
Week 2
Week 3
Week 4

3. Daily practice routine

4. Recommended exercises

5. Final project challenge


Make it motivating and realistic.
"""


    response = ollama.chat(
        model="llama3.2",
        messages=[
            {
             "role":"user",
             "content":prompt
            }
        ]
    )


    return response["message"]["content"]