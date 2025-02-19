from pathlib import Path
import shutil
import os

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

async def upload_to_storage(file) -> str:
    file_path = UPLOAD_DIR / file.filename
    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return str(file_path)

async def delete_from_storage(file_path: str) -> bool:
    try:
        os.remove(file_path)
        return True
    except:
        return False 