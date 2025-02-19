from pymongo import MongoClient
from app.utils.config import MONGO_URI, DB_NAME

client = MongoClient(MONGO_URI)
db = client[DB_NAME]

def save_file(file_id: str, filename: str, contents: bytes) -> bool:
    try:
        db.files.insert_one({
            "file_id": file_id,
            "filename": filename,
            "content": contents,
        })
        return True
    except Exception as e:
        print("Error saving file:", e)
        return False

