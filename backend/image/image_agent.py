import os
import requests
from dotenv import load_dotenv

from image.prompt_builder import build_flux_prompt
from image.image_cache import (
    get_image_path,
    image_exists,
)
from image.image_utils import save_image

load_dotenv()

HF_TOKEN = os.getenv("HF_TOKEN")

API_URL = "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell"

HEADERS = {
    "Authorization": f"Bearer {HF_TOKEN}"
}


def generate_tutorial_image(topic, steps):

    prompt = build_flux_prompt(topic, steps)

    path = get_image_path(prompt)

    if image_exists(prompt):
        return path

    response = requests.post(
        API_URL,
        headers=HEADERS,
        json={
            "inputs": prompt
        },
        timeout=180
    )

    if response.status_code != 200:
        raise Exception(response.text)

    save_image(response.content, path)

    return path