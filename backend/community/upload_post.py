import uuid
from community.supabase_client import supabase


def upload_post(image_file, username: str, caption: str):
    # Generate unique filename
    extension = image_file.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{extension}"

    # Read image bytes
    image_bytes = image_file.file.read()

    # Upload to Supabase Storage
    supabase.storage.from_("community-images").upload(
        filename,
        image_bytes,
        {"content-type": image_file.content_type}
    )

    # Get public URL
    image_url = supabase.storage.from_("community-images").get_public_url(filename)

    # Save post to database
    data = (
        supabase.table("community_posts")
        .insert({
            "username": username,
            "caption": caption,
            "image_url": image_url,
            "likes": 0
        })
        .execute()
    )

    return data.data