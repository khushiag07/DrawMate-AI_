import os

OUTPUT_FOLDER = "generated"

os.makedirs(OUTPUT_FOLDER, exist_ok=True)


def save_image(image_bytes, path):
    with open(path, "wb") as f:
        f.write(image_bytes)

    return path