import json
import os

MEMORY_FILE = "user_memory.json"


def load_memory():

    if not os.path.exists(MEMORY_FILE):
        return {
            "level":"beginner",
            "strengths":[],
            "weaknesses":[],
            "completed_challenges":[]
        }

    with open(MEMORY_FILE,"r") as f:
        return json.load(f)



def update_memory(strengths, weaknesses):

    memory = load_memory()

    memory["strengths"].extend(strengths)
    memory["weaknesses"].extend(weaknesses)


    memory["strengths"] = list(
        set(memory["strengths"])
    )

    memory["weaknesses"] = list(
        set(memory["weaknesses"])
    )


    with open(MEMORY_FILE,"w") as f:
        json.dump(
            memory,
            f,
            indent=4
        )

    return memory