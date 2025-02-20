from fastapi import APIRouter, UploadFile, File
from services.cough_counter import count_coughs_in_audio

router = APIRouter()

@router.get("/googlefit/spo2", summary="Fetch spO₂ data from Google Fit")
def get_spo2():
    # Dummy implementation; integrate actual Google Fit API calls as needed
    spo2_value = 98  
    return {"spo2": spo2_value}

@router.post("/coughcount", summary="Count coughs from an audio sample")
async def cough_count(audio_file: UploadFile = File(...)):
    contents = await audio_file.read()
    cough_count = count_coughs_in_audio(contents)
    return {"cough_count": cough_count}
