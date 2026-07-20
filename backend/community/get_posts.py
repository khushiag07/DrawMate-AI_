from community.supabase_client import supabase

def get_posts():
    response = supabase.table("community_posts").select("*").execute()

    print("Response:", response)
    print("Data:", response.data)

    return response.data