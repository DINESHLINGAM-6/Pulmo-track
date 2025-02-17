import supabase
import os
from dotenv import load_dotenv

load_dotenv()

supabase_client = supabase.create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))

def sign_up(email, password):
    return supabase_client.auth.sign_up({"email": email, "password": password})

def sign_in(email, password):
    return supabase_client.auth.sign_in_with_password({"email": email, "password": password})
