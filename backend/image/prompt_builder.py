def build_step_prompt(topic, title, description):

    return f"""
Create an educational drawing tutorial image.

Subject:
{topic}

Current Stage:
{title}

Instruction:
{description}

Style Requirements:

• White paper
• Black graphite pencil
• Clean line art
• Beginner drawing textbook
• Educational illustration
• Construction lines visible
• No colors
• No background
• No artistic effects
• Highly detailed
• Only draw this stage
"""