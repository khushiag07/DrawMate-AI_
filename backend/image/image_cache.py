import hashlib
import os

CACHE_FOLDER = "generated"


def get_image_path(prompt: str):
    filename = hashlib.md5(prompt.encode()).hexdigest() + ".png"
    return os.path.join(CACHE_FOLDER, filename)


def image_exists(prompt: str):
    return os.path.exists(get_image_path(prompt))