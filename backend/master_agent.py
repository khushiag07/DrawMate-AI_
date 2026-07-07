from intent_classifier import classify_intent

from chat_agent import chat_with_drawmate
from tutor_agent import ask_drawmate
from roadmap_agent import generate_roadmap
from challenge_agent import generate_challenge
from breakdown_agent import create_drawing_breakdown


def run_master_agent(message: str):

    intent = classify_intent(message)

    print("Intent:", intent)

    if intent == "chat":
        return chat_with_drawmate(message)

    if intent == "drawing":
        return ask_drawmate(message)

    if intent == "roadmap":
        return generate_roadmap(message)

    if intent == "challenge":
        return generate_challenge()

    if intent == "breakdown":
        return create_drawing_breakdown(message)

    return chat_with_drawmate(message)