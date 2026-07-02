from vector_store import search_knowledge, add_knowledge
from knowledge_agent import get_wikipedia_knowledge
from tutor_agent import ask_drawmate


def drawmate_agent(question):

    # Step 1: Search memory
    memory = search_knowledge(question)


    # Step 2: If memory empty → learn online
    if not memory or len(memory) < 200:

        print("Learning new knowledge...")

        online_data = get_wikipedia_knowledge(question)

        if online_data:
            add_knowledge(
                online_data,
                question.replace(" ","_")
            )

    # Step 3: Answer
    answer = ask_drawmate(question)

    return answer