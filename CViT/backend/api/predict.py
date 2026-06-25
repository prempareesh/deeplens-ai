import os
import uuid
import shutil
from fastapi import APIRouter, UploadFile, File, HTTPException
from backend.services.prediction_service import prediction_service

router = APIRouter()

# Directory for uploads
UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".bmp"}
VIDEO_EXTENSIONS = {".mp4", ".avi", ".mov", ".mpeg", ".mpg"}

@router.post("/predict")
async def predict_media(file: UploadFile = File(...)):
    filename = file.filename
    _, ext = os.path.splitext(filename.lower())
    
    if ext in IMAGE_EXTENSIONS:
        media_type = "image"
    elif ext in VIDEO_EXTENSIONS:
        media_type = "video"
    else:
        raise HTTPException(
            status_code=400, 
            detail=f"Unsupported file format. Supported formats: images ({IMAGE_EXTENSIONS}) and videos ({VIDEO_EXTENSIONS})"
        )

    # Save file to uploads folder temporarily
    temp_file_path = os.path.join(UPLOAD_DIR, f"{uuid.uuid4()}{ext}")
    try:
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save uploaded file: {str(e)}")

    try:
        # Run prediction
        result = prediction_service.predict(temp_file_path, media_type)
        return result
    except ValueError as val_err:
        raise HTTPException(status_code=400, detail=str(val_err))
    except Exception as err:
        raise HTTPException(status_code=500, detail=f"Inference error: {str(err)}")
