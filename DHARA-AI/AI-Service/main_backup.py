
from fastapi import FastAPI, UploadFile, File, HTTPException  # type: ignore[import-not-found]
from fastapi.middleware.cors import CORSMiddleware  # type: ignore[import-not-found]
from PIL import Image  # type: ignore[import-not-found]
import io
import torch  # type: ignore[import-not-found]
import torchvision.models as models  # type: ignore[import-not-found]

app = FastAPI(
    title="DHARA-AI Engine",
    description="AI-powered crop intelligence service",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

device = torch.device(
    "cuda" if torch.cuda.is_available() else "cpu"
)

weights = models.MobileNet_V2_Weights.DEFAULT
model = models.mobilenet_v2(weights=weights)
model = model.to(device)
model.eval()

preprocess = weights.transforms()


@app.get("/")
async def home():
    return {
        "message": "Welcome to DHARA-AI Engine",
        "status": "running",
        "device": str(device),
        "model": "MobileNetV2"
    }


@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "ai_model": "loaded",
        "device": str(device)
    }


@app.post("/predict")
async def predict_crop_image(file: UploadFile = File(...)):

    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a valid image."
        )

    try:
        image_bytes = await file.read()

        if len(image_bytes) > 10 * 1024 * 1024:
            raise HTTPException(
                status_code=413,
                detail="Image size must be below 10 MB."
            )

        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        image_tensor = preprocess(image).unsqueeze(0).to(device)

        with torch.inference_mode():
            outputs = model(image_tensor)
            probabilities = torch.nn.functional.softmax(
                outputs[0], dim=0
            )

        confidence, predicted_class = torch.max(probabilities, dim=0)

        prediction = weights.meta["categories"][predicted_class.item()]

        return {
            "model": "MobileNetV2",
            "prediction": prediction,
            "confidence": round(confidence.item() * 100, 2),
            "status": "prediction_generated",
            "notice": "Generic ImageNet prediction, not a validated crop disease diagnosis."
        }

    except HTTPException:
        raise

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Image analysis failed: {str(error)}"
        )
