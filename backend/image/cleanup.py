import os
import time

GENERATED_FOLDER = "generated"

# Delete images older than 7 days
MAX_AGE_DAYS = 7


def cleanup_old_images():
    if not os.path.exists(GENERATED_FOLDER):
        return

    now = time.time()
    deleted = 0

    for filename in os.listdir(GENERATED_FOLDER):
        path = os.path.join(GENERATED_FOLDER, filename)

        if not os.path.isfile(path):
            continue

        age_days = (now - os.path.getmtime(path)) / (60 * 60 * 24)

        if age_days > MAX_AGE_DAYS:
            os.remove(path)
            deleted += 1

    print(f"🧹 Cleanup complete. Deleted {deleted} old image(s).")
MAX_IMAGES = 500


def limit_cache_size():
    if not os.path.exists(GENERATED_FOLDER):
        return

    files = [
        os.path.join(GENERATED_FOLDER, f)
        for f in os.listdir(GENERATED_FOLDER)
        if os.path.isfile(os.path.join(GENERATED_FOLDER, f))
    ]

    if len(files) <= MAX_IMAGES:
        return

    files.sort(key=os.path.getmtime)

    while len(files) > MAX_IMAGES:
        oldest = files.pop(0)
        os.remove(oldest)
        print(f"🗑 Deleted cache file: {os.path.basename(oldest)}")