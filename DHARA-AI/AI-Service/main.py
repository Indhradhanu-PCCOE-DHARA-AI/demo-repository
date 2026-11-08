
import io
import importlib
from contextlib import asynccontextmanager

from fastapi import FastAPI, File, Form, HTTPException, UploadFile  # pyright: ignore[reportMissingImports]
from fastapi.middleware.cors import CORSMiddleware  # pyright: ignore[reportMissingImports]

try:
    pipeline = importlib.import_module("transformers").pipeline
except (ImportError, OSError):
    pipeline = None


MODEL_ID = "rodynaemad/plant-disease-dinov2-small"
MAX_FILE_SIZE = 10 * 1024 * 1024

# Initial screening threshold, not a medically or agronomically
# validated diagnostic threshold.
LOW_CONFIDENCE_THRESHOLD = 0.50

classifier = None

try:
    Image = importlib.import_module("PIL.Image")
    UnidentifiedImageError = importlib.import_module("PIL").UnidentifiedImageError
except (ImportError, OSError):
    Image = None
    UnidentifiedImageError = OSError

try:
    # Keep the service importable when PyTorch is not installed in the
    # selected development environment; the classifier can use CPU instead.
    torch = importlib.import_module("torch")
except (ImportError, OSError):
    torch = None


def cuda_available():
    return torch is not None and torch.cuda.is_available()


def normalize_crop(crop_name):
    """Normalize crop names for comparison."""
    name = crop_name.lower().strip()
    name = name.replace("(maize)", "").replace("maize", "corn")
    name = name.replace("_", " ").replace("-", " ")
    return " ".join(name.split())


def is_crop_unspecified(crop_name):
    if not crop_name:
        return True

    return normalize_crop(crop_name) in [
        "other",
        "other not sure",
        "not sure",
        "unknown",
    ]


@asynccontextmanager
async def lifespan(app: FastAPI):
    global classifier

    if pipeline is None:
        print("Transformers is unavailable; plant-disease model was not loaded.")
        yield
        return

    print(f"Loading plant-disease model: {MODEL_ID}")

    device = 0 if cuda_available() else -1

    classifier = pipeline(
        "image-classification",
        model=MODEL_ID,
        device=device,
    )

    print("Plant-disease model loaded successfully.")

    yield

    classifier = None


app = FastAPI(
    title="DHARA-AI Plant Intelligence Service",
    description="Pretrained plant-leaf image classification API",
    version="2.1.0",
    lifespan=lifespan,
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "project": "DHARA-AI",
        "service": "Plant Disease AI",
        "status": "running",
        "model": MODEL_ID,
    }


@app.get("/health")
def health():
    return {
        "status": (
            "healthy" if classifier is not None
            else "unavailable" if pipeline is None
            else "loading"
        ),
        "model": MODEL_ID,
        "device": "cuda" if cuda_available() else "cpu",
    }


@app.post("/predict")
async def predict(
    file: UploadFile = File(...),
    selected_crop: str = Form(default=""),
):
    if classifier is None:
        raise HTTPException(
            status_code=503,
            detail="AI model is not ready yet.",
        )

    if Image is None:
        raise HTTPException(
            status_code=503,
            detail="Image processing is unavailable. Install the Pillow package.",
        )

    if file.content_type and not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=415,
            detail="Please upload an image file.",
        )

    contents = await file.read(MAX_FILE_SIZE + 1)

    if not contents:
        raise HTTPException(
            status_code=400,
            detail="The uploaded file is empty.",
        )

    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="Image must be 10 MB or smaller.",
        )

    try:
        with Image.open(io.BytesIO(contents)) as source:
            image = source.convert("RGB")

    except (UnidentifiedImageError, OSError, ValueError):
        raise HTTPException(
            status_code=400,
            detail="Could not read this image. Please upload a valid photo.",
        )

    try:
        predictions = classifier(image, top_k=3)

    except Exception as exc:
        print(f"Prediction failed: {exc}")

        raise HTTPException(
            status_code=500,
            detail="Image analysis failed. Please try again.",
        )

    if not predictions:
        raise HTTPException(
            status_code=500,
            detail="The AI model returned no predictions.",
        )

    best = predictions[0]

    label = best["label"]
    confidence = float(best["score"])

    parts = label.split("___", 1)

    predicted_crop = parts[0].replace("_", " ").strip()

    condition = (
        parts[1].replace("_", " ").strip()
        if len(parts) > 1
        else label.replace("_", " ")
    )

    # Crop selection validation
    crop_match = None

    if not is_crop_unspecified(selected_crop):
        crop_match = (
            normalize_crop(selected_crop)
            == normalize_crop(predicted_crop)
        )

    # Confidence and result status
    if crop_match is False:
        result_status = "crop_mismatch"
        confidence_level = "review_required"

        warning = (
            f"You selected {selected_crop}, but the AI model predicted "
            f"{predicted_crop}. Please verify the crop and upload a clear "
            "image of the correct plant. Disease identification is not "
            "confirmed."
        )

    elif confidence < LOW_CONFIDENCE_THRESHOLD:
        result_status = "low_confidence"
        confidence_level = "low"

        warning = (
            "The model has low confidence in this prediction. "
            "The displayed condition is only a possible match, not a "
            "confirmed disease. Try a clearer photograph and seek "
            "agricultural expert verification."
        )

    else:
        result_status = "screening_result"
        confidence_level = "screening"

        warning = (
            "This is an AI screening result, not a confirmed diagnosis. "
            "Real-world farm performance may differ. Verify suspected "
            "disease with an agricultural expert before treatment."
        )

    top_predictions = [
        {
            "label": item["label"],
            "confidence": round(float(item["score"]), 4),
        }
        for item in predictions
    ]

    return {
        "success": True,
        "model": MODEL_ID,

        "prediction": label,
        "crop": predicted_crop,
        "condition": condition,

        "confidence": round(confidence, 4),
        "confidence_level": confidence_level,

        "selected_crop": selected_crop or None,
        "crop_match": crop_match,

        "result_status": result_status,

        "top_predictions": top_predictions,

        "warning": warning,
    }
