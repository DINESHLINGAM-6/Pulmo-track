from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))
db = client.pulmoTrack # Change to your actual database name

# Collections
users_collection = db["users"]
reports_collection = db["reports"]
progress_collection = db["progress_data"]
