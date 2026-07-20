import uuid
import traceback
from community.supabase_client import supabase


def upload_post(image_file, username: str, caption: str):
    try:
        extension = image_file.filename.split(".")[-1]
        filename = f"{uuid.uuid4()}.{extension}"

        image_bytes = image_file.file.read()

        print("Uploading:", filename)

        upload_response = supabase.storage.from_("community-images").upload(
            filename,
            image_bytes,
            {"content-type": image_file.content_type},
        )

        print("Upload response:", upload_response)

        image_url = supabase.storage.from_("community-images").get_public_url(filename)

        print("Public URL:", image_url)

        post = {
            "username": username,
            "caption": caption,
            "image_url": image_url,
            "likes": 0,
        }

        data = (
            supabase.table("community_posts")
            .insert(post)
            .execute()
        )

        print(data)

        return data.data

    except Exception:
        traceback.print_exc()
        raise