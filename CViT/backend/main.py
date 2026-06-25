import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api.predict import router as predict_router
from backend.services.prediction_service import prediction_service

app = FastAPI(
    title="CViT Deepfake Detection API",
    description="Production-ready FastAPI backend for Convolutional Vision Transformer deepfake detection.",
    version="1.0.0"
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(predict_router)

@app.on_event("startup")
async def startup_event():
    # Warm up / pre-load the weights on startup to ensure fast first-time predictions
    try:
        prediction_service.load_model()
    except Exception as e:
        print(f"Warning: Could not pre-load model during startup. It will load on first request. Reason: {str(e)}")

@app.get("/")
async def root():
    return {"message": "CViT Deepfake Detection API is running. Use POST /predict to submit media."}

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
