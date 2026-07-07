from community.supabase_client import supabase

def get_posts():

    response = (
        supabase.table("community_posts")
        .select("*")
        .order("created_at", desc=True)
        .execute()
    )

    return response.data