
import io
import torch

from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline
from PIL import Image


MODEL_ID = "rodynaemad/plant-disease-dinov2-small"
MAX_FILE_SIZE = 10 * 1024 * 1024
CONFIDENCE_THRESHOLD = 0.50

app = FastAPI(title="DHARA-AI Cloud Inference Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

classifier = None


@app.on_event("startup")
async def load_model():
    global classifier

    device = 0 if torch.cuda.is_available() else -1

    classifier = pipeline(
        "image-classification",
        model=MODEL_ID,
        device=device
    )

    print("DHARA-AI model loaded successfully!")


@app.get("/")
async def home():
    return {
        "success": True,
        "service": "DHARA-AI Cloud AI Service",
        "status": "running"
    }


@app.get("/health")
async def health():
    return {
        "success": True,
        "model_loaded": classifier is not None,
        "model": MODEL_ID
    }


@app.post("/predict")
async def predict(
    file: UploadFile = File(...),
    selected_crop: str = Form("")
):
    if classifier is None:
        raise HTTPException(
            status_code=503,
            detail="AI model is not ready."
        )

    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a valid image."
        )

    image_bytes = await file.read()

    if len(image_bytes) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="Image size must be below 10 MB."
        )

    try:
        image = Image.open(
            io.BytesIO(image_bytes)
        ).convert("RGB")
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Unable to read the uploaded image."
        )

    try:
        results = classifier(image, top_k=3)
    except Exception as error:
        print("Prediction error:", str(error))
        raise HTTPException(
            status_code=500,
            detail="AI prediction failed. Please try again."
        )

    if not results:
        raise HTTPException(
            status_code=500,
            detail="No prediction generated."
        )

    best = results[0]

    raw_label = best["label"]
    confidence = float(best["score"])

    if "___" in raw_label:
        crop, condition = raw_label.split("___", 1)
        condition = condition.replace("_", " ")
    else:
        crop = "Unknown"
        condition = raw_label.replace("_", " ")

    crop = crop.replace("_", " ")

    crop_match = (
        not selected_crop
        or selected_crop.strip().lower() == crop.strip().lower()
    )

    if confidence >= 0.75:
        confidence_level = "High"
    elif confidence >= CONFIDENCE_THRESHOLD:
        confidence_level = "Moderate"
    else:
        confidence_level = "Low"

    result_status = (
        "success"
        if confidence >= CONFIDENCE_THRESHOLD and crop_match
        else "warning"
    )

    warning = None

    if not crop_match:
        warning = (
            f"Selected crop is {selected_crop}, "
            f"but the model detected {crop}."
        )
    elif confidence < CONFIDENCE_THRESHOLD:
        warning = (
            "The prediction confidence is low. "
            "Please upload a clearer image."
        )

    top_predictions = []

    for item in results:
        label = item["label"]
        score = float(item["score"])

        if "___" in label:
            predicted_crop, predicted_condition = label.split("___", 1)
            predicted_condition = predicted_condition.replace("_", " ")
        else:
            predicted_crop = "Unknown"
            predicted_condition = label.replace("_", " ")

        top_predictions.append({
            "label": label,
            "crop": predicted_crop.replace("_", " "),
            "condition": predicted_condition,
            "confidence": round(score * 100, 2)
        })

    return {
        "success": True,
        "model": MODEL_ID,
        "prediction": condition,
        "crop": crop,
        "condition": condition,
        "confidence": round(confidence * 100, 2),
        "confidence_level": confidence_level,
        "selected_crop": selected_crop,
        "crop_match": crop_match,
        "result_status": result_status,
        "top_predictions": top_predictions,
        "warning": warning
    }
