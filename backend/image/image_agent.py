import os
import requests
from concurrent.futures import ThreadPoolExecutor
from dotenv import load_dotenv

from image.prompt_builder import build_step_prompt

load_dotenv()

HF_TOKEN = os.getenv("HF_TOKEN")

API_URL = "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell"

HEADERS = {
    "Authorization": f"Bearer {HF_TOKEN}"
}

OUTPUT_FOLDER = "generated"
os.makedirs(OUTPUT_FOLDER, exist_ok=True)


def generate_single_image(topic, milestone, index):

    prompt = build_step_prompt(
        topic,
        milestone["title"],
        milestone["description"]
    )

    response = requests.post(
        API_URL,
        headers=HEADERS,
        json={"inputs": prompt},
        timeout=180
    )

    if response.status_code != 200:
        return None

    filename = f"{topic.replace(' ','_')}_{index}.png"

    path = os.path.join(
        OUTPUT_FOLDER,
        filename
    )

    with open(path, "wb") as f:
        f.write(response.content)

    return path


def generate_step_images(topic, milestones):

    with ThreadPoolExecutor(max_workers=4) as executor:

        futures = [
            executor.submit(
                generate_single_image,
                topic,
                milestone,
                i + 1
            )
            for i, milestone in enumerate(milestones)
        ]

    return [f.result() for f in futures if f.result()]