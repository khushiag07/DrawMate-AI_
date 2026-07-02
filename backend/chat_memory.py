import json
import os


CHAT_FILE = "chat_history.json"


def load_chat():

    if not os.path.exists(CHAT_FILE):
        return []


    with open(CHAT_FILE,"r") as f:
        return json.load(f)



def save_chat(user, assistant):

    history = load_chat()


    history.append(
        {
            "user": user,
            "assistant": assistant
        }
    )


    # keep last 10 messages only
    history = history[-10:]


    with open(CHAT_FILE,"w") as f:
        json.dump(
            history,
            f,
            indent=4
        )



def get_chat_context():

    history = load_chat()


    context = ""

    for chat in history:
        context += f"""
User:
{chat['user']}

Assistant:
{chat['assistant']}

"""

    return context