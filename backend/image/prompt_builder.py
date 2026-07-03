def build_flux_prompt(topic: str, steps: str) -> str:
    return f"""
Create a professional educational drawing tutorial.

Subject:
{topic}

Drawing Steps:
{steps}

Requirements:

- White paper background
- Black pencil sketch
- Four numbered panels
- Clean line art
- Educational
- Beginner friendly
- No colors
- No extra decorations
- Each panel must clearly show the next drawing step.
- Looks like a page from a professional drawing book.

Generate one single tutorial image.
"""