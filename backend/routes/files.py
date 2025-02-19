from fastapi import APIRouter, UploadFile, File, HTTPException
import uuid
from app.services.mongo import save_file

router = APIRouter()

@router.post("/upload", summary="Upload a file")
async def upload_file(file: UploadFile = File(...)):
    file_id = str(uuid.uuid4())
    contents = await file.read()
    
    # Save the file (PDF, image, scan) to MongoDB or your chosen storage
    if not save_file(file_id, file.filename, contents):
        raise HTTPException(status_code=500, detail="File upload failed")
    
    return {"file_id": file_id, "filename": file.filename}
