from tutor_agent import ask_drawmate
from breakdown_agent import create_drawing_breakdown
from roadmap_agent import generate_roadmap
from challenge_agent import generate_challenge


def run_master_agent(message: str):
    text = message.lower()

    if "breakdown" in text or "break down" in text:
        topic = message.replace("breakdown", "").replace("break down", "").strip()
        return create_drawing_breakdown(topic)

    if "roadmap" in text or "learn" in text or "master" in text:
        return generate_roadmap(message)

    if "challenge" in text or "practice task" in text or "daily task" in text:
        return generate_challenge()

    return ask_drawmate(message)