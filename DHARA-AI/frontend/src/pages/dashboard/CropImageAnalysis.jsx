
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import "./CropImageAnalysis.css";

const AI_API_URL = "https://dhara-ai-inference.onrender.com/predict";

const plantParts = [
  "Leaf",
  "Stem",
  "Fruit",
  "Root",
  "Whole plant",
  "Other",
];

const translations = {
  en: {
    kicker: "GROUND-LEVEL PLANT INTELLIGENCE",
    title: "Crop Image Analysis",
    description: "Upload a photograph from your registered farm field to screen for possible crop diseases and plant health conditions.",
    selectField: "Select registered field",
    noFields: "No registered fields available",
    chooseField: "Choose a field",
    noFieldsFound: "No registered fields found.",
    addField: "Please add your field information through the onboarding section before analysing a crop image.",
    selectedField: "SELECTED FIELD",
    registeredCrop: "REGISTERED CROP",
    soilType: "SOIL TYPE",
    irrigation: "IRRIGATION METHOD",
    farmLocation: "FARM LOCATION",
    notSpecified: "Not specified",
    locationNotRegistered: "Location not registered",
    cropForAnalysis: "Crop selected for analysis",
    cropPlaceholder: "Automatically populated from selected field",
    cropHint: "Crop information is taken directly from your selected field profile.",
    plantPart: "Plant part photographed",
    leaf: "Leaf",
    stem: "Stem",
    fruit: "Fruit",
    root: "Root",
    wholePlant: "Whole plant",
    other: "Other",
    uploadTitle: "Upload crop photograph",
    uploadDescription: "Use a clear photograph of the affected plant or plant part.",
    dropImage: "Drop your crop image here",
    or: "or",
    browse: "browse files",
    fromDevice: "from your device",
    fileTypes: "JPG, JPEG, PNG · Maximum 10 MB",
    removeImage: "Remove image",
    uploadedImage: "Uploaded crop",
    invalidImage: "Please upload a valid image file.",
    imageTooLarge: "Image size must be less than 10 MB.",
    selectFieldError: "Please select a registered field first.",
    uploadFirst: "Please upload a crop photograph first.",
    cropMissing: "The selected field does not have a registered crop.",
    analysisError: "Unable to analyse the crop image.",
    analysisFailed: "Something went wrong while analysing the image. Please try again.",
    analysing: "Analysing crop image...",
    analyse: "Analyse crop image",
    footer: "AI-generated results are preliminary screening outputs, not confirmed agricultural diagnoses.",
    report: "AI SCREENING REPORT",
    mismatchTitle: "Crop mismatch detected",
    lowTitle: "Low-confidence result",
    completeTitle: "Image analysis completed",
    mismatchDescription: "The crop identified by the AI model does not match the crop registered for this field.",
    lowDescription: "The model is uncertain about this prediction. A clearer photograph and expert inspection are recommended.",
    completeDescription: "The AI model has identified a possible crop condition from your uploaded photograph.",
    unavailable: "Not available",
    notIdentified: "Not identified",
    plantPartLabel: "PLANT PART",
    identifiedCrop: "IDENTIFIED CROP",
    condition: "POSSIBLE CONDITION",
    confidence: "MODEL CONFIDENCE SCORE",
    screening: "Screening",
    confidenceNote: "This score represents the model's output confidence. It is not a validated probability that the disease is present.",
    otherPredictions: "Other possible predictions",
    verifyCrop: "Crop verification required",
    inspectFurther: "Further inspection recommended",
    important: "Important information",
    expertAdvice: "Please verify this result with an agricultural expert.",
    model: "Plant disease classification model",
    preliminary: "Preliminary AI screening only",
  },

  hi: {
    kicker: "खेत स्तर की पौधों की जानकारी",
    title: "फसल की तस्वीर का विश्लेषण",
    description: "संभावित फसल रोगों और पौधों के स्वास्थ्य की जांच के लिए अपने पंजीकृत खेत की तस्वीर अपलोड करें।",
    selectField: "पंजीकृत खेत चुनें",
    noFields: "कोई पंजीकृत खेत उपलब्ध नहीं है",
    chooseField: "खेत चुनें",
    noFieldsFound: "कोई पंजीकृत खेत नहीं मिला।",
    addField: "फसल की तस्वीर का विश्लेषण करने से पहले ऑनबोर्डिंग सेक्शन में अपने खेत की जानकारी जोड़ें।",
    selectedField: "चयनित खेत",
    registeredCrop: "पंजीकृत फसल",
    soilType: "मिट्टी का प्रकार",
    irrigation: "सिंचाई का तरीका",
    farmLocation: "खेत का स्थान",
    notSpecified: "निर्दिष्ट नहीं",
    locationNotRegistered: "स्थान पंजीकृत नहीं है",
    cropForAnalysis: "विश्लेषण के लिए चुनी गई फसल",
    cropPlaceholder: "चयनित खेत से अपने आप भरा जाएगा",
    cropHint: "फसल की जानकारी सीधे आपके चुने हुए खेत की प्रोफाइल से ली जाती है।",
    plantPart: "तस्वीर में पौधे का भाग",
    leaf: "पत्ता",
    stem: "तना",
    fruit: "फल",
    root: "जड़",
    wholePlant: "पूरा पौधा",
    other: "अन्य",
    uploadTitle: "फसल की तस्वीर अपलोड करें",
    uploadDescription: "प्रभावित पौधे या उसके भाग की स्पष्ट तस्वीर का उपयोग करें।",
    dropImage: "अपनी फसल की तस्वीर यहां छोड़ें",
    or: "या",
    browse: "फाइलें चुनें",
    fromDevice: "अपने डिवाइस से",
    fileTypes: "JPG, JPEG, PNG · अधिकतम 10 MB",
    removeImage: "तस्वीर हटाएं",
    uploadedImage: "अपलोड की गई फसल",
    invalidImage: "कृपया सही इमेज फाइल अपलोड करें।",
    imageTooLarge: "तस्वीर का आकार 10 MB से कम होना चाहिए।",
    selectFieldError: "कृपया पहले एक पंजीकृत खेत चुनें।",
    uploadFirst: "कृपया पहले फसल की तस्वीर अपलोड करें।",
    cropMissing: "चुने हुए खेत में कोई फसल पंजीकृत नहीं है।",
    analysisError: "फसल की तस्वीर का विश्लेषण नहीं हो सका।",
    analysisFailed: "तस्वीर का विश्लेषण करते समय कुछ गलत हुआ। कृपया फिर से प्रयास करें।",
    analysing: "फसल की तस्वीर का विश्लेषण हो रहा है...",
    analyse: "फसल की तस्वीर का विश्लेषण करें",
    footer: "AI द्वारा दिए गए परिणाम शुरुआती जांच के लिए हैं, ये कृषि संबंधी पुष्ट निदान नहीं हैं।",
    report: "AI जांच रिपोर्ट",
    mismatchTitle: "फसल का मिलान नहीं हुआ",
    lowTitle: "कम विश्वास वाला परिणाम",
    completeTitle: "तस्वीर का विश्लेषण पूरा हुआ",
    mismatchDescription: "AI मॉडल द्वारा पहचानी गई फसल इस खेत में पंजीकृत फसल से मेल नहीं खाती।",
    lowDescription: "मॉडल इस अनुमान को लेकर निश्चित नहीं है। अधिक स्पष्ट तस्वीर और विशेषज्ञ की जांच की सलाह दी जाती है।",
    completeDescription: "AI मॉडल ने आपकी अपलोड की गई तस्वीर से फसल की संभावित स्थिति पहचानी है।",
    unavailable: "उपलब्ध नहीं",
    notIdentified: "पहचान नहीं हुई",
    plantPartLabel: "पौधे का भाग",
    identifiedCrop: "पहचानी गई फसल",
    condition: "संभावित स्थिति",
    confidence: "मॉडल का विश्वास स्कोर",
    screening: "प्रारंभिक जांच",
    confidenceNote: "यह स्कोर मॉडल के अनुमान में उसके विश्वास को दर्शाता है। यह बीमारी मौजूद होने की प्रमाणित संभावना नहीं है।",
    otherPredictions: "अन्य संभावित अनुमान",
    verifyCrop: "फसल की पुष्टि आवश्यक है",
    inspectFurther: "आगे की जांच की सलाह",
    important: "महत्वपूर्ण जानकारी",
    expertAdvice: "कृपया इस परिणाम की पुष्टि कृषि विशेषज्ञ से करें।",
    model: "पौधों के रोगों का वर्गीकरण मॉडल",
    preliminary: "केवल प्रारंभिक AI जांच",
  },

  mr: {
    kicker: "शेतपातळीवरील वनस्पती माहिती",
    title: "पिकाच्या प्रतिमेचे विश्लेषण",
    description: "संभाव्य पीक रोग आणि वनस्पतींच्या आरोग्याची तपासणी करण्यासाठी तुमच्या नोंदणीकृत शेतातील फोटो अपलोड करा.",
    selectField: "नोंदणीकृत शेत निवडा",
    noFields: "नोंदणीकृत शेत उपलब्ध नाही",
    chooseField: "शेत निवडा",
    noFieldsFound: "नोंदणीकृत शेत आढळले नाही.",
    addField: "पिकाच्या प्रतिमेचे विश्लेषण करण्यापूर्वी ऑनबोर्डिंग विभागात तुमच्या शेताची माहिती जोडा.",
    selectedField: "निवडलेले शेत",
    registeredCrop: "नोंदणीकृत पीक",
    soilType: "मातीचा प्रकार",
    irrigation: "सिंचन पद्धत",
    farmLocation: "शेताचे ठिकाण",
    notSpecified: "नमूद केलेले नाही",
    locationNotRegistered: "ठिकाण नोंदणीकृत नाही",
    cropForAnalysis: "विश्लेषणासाठी निवडलेले पीक",
    cropPlaceholder: "निवडलेल्या शेतातून आपोआप भरले जाईल",
    cropHint: "पिकाची माहिती थेट तुमच्या निवडलेल्या शेताच्या प्रोफाइलमधून घेतली जाते.",
    plantPart: "फोटोमधील वनस्पतीचा भाग",
    leaf: "पान",
    stem: "खोड",
    fruit: "फळ",
    root: "मूळ",
    wholePlant: "संपूर्ण वनस्पती",
    other: "इतर",
    uploadTitle: "पिकाचा फोटो अपलोड करा",
    uploadDescription: "प्रभावित वनस्पतीचा किंवा तिच्या भागाचा स्पष्ट फोटो वापरा.",
    dropImage: "तुमच्या पिकाचा फोटो येथे टाका",
    or: "किंवा",
    browse: "फाइल निवडा",
    fromDevice: "तुमच्या डिव्हाइसमधून",
    fileTypes: "JPG, JPEG, PNG · कमाल 10 MB",
    removeImage: "फोटो काढून टाका",
    uploadedImage: "अपलोड केलेले पीक",
    invalidImage: "कृपया योग्य इमेज फाइल अपलोड करा.",
    imageTooLarge: "फोटोचा आकार 10 MB पेक्षा कमी असावा.",
    selectFieldError: "कृपया प्रथम नोंदणीकृत शेत निवडा.",
    uploadFirst: "कृपया प्रथम पिकाचा फोटो अपलोड करा.",
    cropMissing: "निवडलेल्या शेतासाठी पीक नोंदणीकृत नाही.",
    analysisError: "पिकाच्या प्रतिमेचे विश्लेषण करता आले नाही.",
    analysisFailed: "प्रतिमेचे विश्लेषण करताना काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा.",
    analysing: "पिकाच्या प्रतिमेचे विश्लेषण सुरू आहे...",
    analyse: "पिकाच्या प्रतिमेचे विश्लेषण करा",
    footer: "AI द्वारे मिळालेले परिणाम प्राथमिक तपासणीसाठी आहेत. ते निश्चित कृषी निदान नाहीत.",
    report: "AI प्राथमिक तपासणी अहवाल",
    mismatchTitle: "पीक जुळत नसल्याचे आढळले",
    lowTitle: "कमी विश्वासार्हतेचा निकाल",
    completeTitle: "प्रतिमेचे विश्लेषण पूर्ण झाले",
    mismatchDescription: "AI मॉडेलने ओळखलेले पीक या शेतासाठी नोंदवलेल्या पिकाशी जुळत नाही.",
    lowDescription: "मॉडेलला या अंदाजाबाबत खात्री नाही. अधिक स्पष्ट फोटो आणि तज्ज्ञांकडून तपासणी करण्याची शिफारस केली जाते.",
    completeDescription: "AI मॉडेलने अपलोड केलेल्या फोटोवरून पिकाची संभाव्य स्थिती ओळखली आहे.",
    unavailable: "उपलब्ध नाही",
    notIdentified: "ओळखले गेले नाही",
    plantPartLabel: "वनस्पतीचा भाग",
    identifiedCrop: "ओळखलेले पीक",
    condition: "संभाव्य स्थिती",
    confidence: "मॉडेल विश्वास गुण",
    screening: "प्राथमिक तपासणी",
    confidenceNote: "हा गुण मॉडेलच्या अंदाजावरील विश्वास दर्शवतो. रोग असल्याची ही प्रमाणित शक्यता नाही.",
    otherPredictions: "इतर संभाव्य अंदाज",
    verifyCrop: "पिकाची पडताळणी आवश्यक",
    inspectFurther: "अधिक तपासणी करण्याची शिफारस",
    important: "महत्त्वाची माहिती",
    expertAdvice: "कृपया या निकालाची कृषी तज्ज्ञांकडून खात्री करून घ्या.",
    model: "वनस्पती रोग वर्गीकरण मॉडेल",
    preliminary: "केवळ प्राथमिक AI तपासणी",
  },
};

function CropImageAnalysis({
  fields = [],
  locations = [],
  onPrediction,
}) {
  const { language } = useLanguage();

  const t = (key) =>
    translations[language]?.[key] || translations.en[key] || key;

  const plantPartLabels = {
    Leaf: t("leaf"),
    Stem: t("stem"),
    Fruit: t("fruit"),
    Root: t("root"),
    "Whole plant": t("wholePlant"),
    Other: t("other"),
  };

  const fileInputRef = useRef(null);

  const [selectedFieldId, setSelectedFieldId] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [plantPart, setPlantPart] = useState("Leaf");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedField = fields.find(
    (field) => String(field._id) === String(selectedFieldId)
  );

  const crop = selectedField?.cropName || "";

  const fieldLocation = locations.find((location) => {
    const locationFieldId =
      typeof location.fieldId === "object"
        ? location.fieldId?._id
        : location.fieldId;

    return String(locationFieldId) === String(selectedFieldId);
  });

  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  const clearPrediction = () => {
    setPrediction(null);
    onPrediction?.(null);
  };

  const handleFieldChange = (event) => {
    setSelectedFieldId(event.target.value);
    clearPrediction();
    setError("");
  };

  const handleImageChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      setError(t("invalidImage"));
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError(t("imageTooLarge"));
      return;
    }

    if (image) {
      URL.revokeObjectURL(image);
    }

    setFile(selectedFile);
    setImage(URL.createObjectURL(selectedFile));
    clearPrediction();
    setError("");
  };

  const removeImage = () => {
    if (image) {
      URL.revokeObjectURL(image);
    }

    setImage(null);
    setFile(null);
    clearPrediction();
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const analyzeImage = async () => {
    if (!selectedFieldId || !selectedField) {
      setError(t("selectFieldError"));
      return;
    }

    if (!file) {
      setError(t("uploadFirst"));
      return;
    }

    if (!crop) {
      setError(t("cropMissing"));
      return;
    }

    setLoading(true);
    setError("");
    clearPrediction();

    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("selected_crop", crop);

      const response = await fetch(AI_API_URL, {
        method: "POST",
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.detail || data.message || t("analysisError")
        );
      }

      setPrediction(data);

      onPrediction?.({
        ...data,
        fieldId: selectedFieldId,
        fieldName: selectedField.fieldName,
        selectedCrop: crop,
        plantPart,
        analyzedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Crop Image Analysis Error:", err);

      setError(
        err.message || t("analysisFailed")
      );
    } finally {
      setLoading(false);
    }
  };

  // API already returns confidence as a percentage.
  const confidencePercentage = prediction
    ? Number(prediction.confidence).toFixed(2)
    : "0.00";

  const isCropMismatch =
    prediction?.result_status === "crop_mismatch" ||
    prediction?.crop_match === false;

  const isLowConfidence =
    prediction?.result_status === "low_confidence" ||
    prediction?.confidence_level === "low";

  const getResultTitle = () => {
    if (isCropMismatch) return t("mismatchTitle");
    if (isLowConfidence) return t("lowTitle");
    return t("completeTitle");
  };

  const getResultDescription = () => {
    if (isCropMismatch) return t("mismatchDescription");

    if (isLowConfidence) return t("lowDescription");

    return t("completeDescription");
  };

  return (
    <section className="crop-analysis-page">
      <div className="dashboard-section-heading">
        <span className="dashboard-kicker">
          {t("kicker")}
        </span>

        <h1>{t("title")}</h1>

        <p>{t("description")}</p>
      </div>

      <div className="crop-analysis-content">
        <div className="crop-result-panel">
          <div className="crop-result-content">
            <div className="crop-form-fields">
              <div className="crop-form-group">
                <label htmlFor="crop-field">
                  {t("selectField")}
                </label>

                <select
                  id="crop-field"
                  value={selectedFieldId}
                  onChange={handleFieldChange}
                  disabled={loading || fields.length === 0}
                >
                  <option value="">
                    {fields.length === 0
                      ? t("noFields")
                      : t("chooseField")}
                  </option>

                  {fields.map((field) => (
                    <option key={field._id} value={field._id}>
                      {field.fieldName} — {field.cropName}
                    </option>
                  ))}
                </select>
              </div>

              {fields.length === 0 && (
                <div className="crop-result-warning">
                  <strong>{t("noFieldsFound")}</strong>
                  <p>{t("addField")}</p>
                </div>
              )}

              {selectedField && (
                <div className="crop-selected-field">
                  <div>
                    <span>{t("selectedField")}</span>
                    <h3>{selectedField.fieldName}</h3>
                  </div>

                  <div>
                    <span>{t("registeredCrop")}</span>
                    <h3>{selectedField.cropName}</h3>
                  </div>

                  <div>
                    <span>{t("soilType")}</span>
                    <h3>
                      {selectedField.soilType || t("notSpecified")}
                    </h3>
                  </div>

                  <div>
                    <span>{t("irrigation")}</span>
                    <h3>
                      {selectedField.irrigationMethod || t("notSpecified")}
                    </h3>
                  </div>

                  <div>
                    <span>{t("farmLocation")}</span>
                    <h3>
                      {fieldLocation
                        ? [
                            fieldLocation.village,
                            fieldLocation.district,
                            fieldLocation.state,
                          ]
                            .filter(Boolean)
                            .join(", ")
                        : t("locationNotRegistered")}
                    </h3>
                  </div>
                </div>
              )}

              <div className="crop-form-group">
                <label htmlFor="crop-name">
                  {t("cropForAnalysis")}
                </label>

                <input
                  id="crop-name"
                  type="text"
                  value={crop}
                  placeholder={t("cropPlaceholder")}
                  readOnly
                />

                <span className="crop-field-hint">
                  {t("cropHint")}
                </span>
              </div>

              <div className="crop-form-group">
                <label htmlFor="plant-part">
                  {t("plantPart")}
                </label>

                <select
                  id="plant-part"
                  value={plantPart}
                  onChange={(event) => setPlantPart(event.target.value)}
                  disabled={loading}
                >
                  {plantParts.map((part) => (
                    <option key={part} value={part}>
                      {plantPartLabels[part]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="crop-upload-section">
              <div className="crop-upload-heading">
                <h3>{t("uploadTitle")}</h3>
                <p>{t("uploadDescription")}</p>
              </div>

              {!image ? (
                <div
                  className="crop-upload-area"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault();

                    const droppedFile = event.dataTransfer.files?.[0];

                    if (droppedFile) {
                      const dataTransfer = new DataTransfer();
                      dataTransfer.items.add(droppedFile);

                      if (fileInputRef.current) {
                        fileInputRef.current.files = dataTransfer.files;
                        fileInputRef.current.dispatchEvent(
                          new Event("change", { bubbles: true })
                        );
                      }
                    }
                  }}
                >
                  <div className="crop-upload-icon">↑</div>

                  <h3>{t("dropImage")}</h3>

                  <p>
                    {t("or")} <span>{t("browse")}</span> {t("fromDevice")}
                  </p>

                  <small>{t("fileTypes")}</small>
                </div>
              ) : (
                <div className="crop-image-preview">
                  <img src={image} alt={t("uploadedImage")} />

                  <div className="crop-image-preview-info">
                    <div>
                      <strong>{file?.name}</strong>
                      <span>
                        {file
                          ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
                          : ""}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={removeImage}
                      disabled={loading}
                    >
                      {t("removeImage")} ✕
                    </button>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </div>

            {error && (
              <div className="crop-analysis-error">
                <span>⚠</span>
                {error}
              </div>
            )}

            <button
              type="button"
              className="crop-analyze-button"
              onClick={analyzeImage}
              disabled={
                loading ||
                !selectedField ||
                !file ||
                fields.length === 0
              }
            >
              {loading ? (
                <>
                  <span className="crop-loading-spinner" />
                  {t("analysing")}
                </>
              ) : (
                <>
                  {t("analyse")} <span>→</span>
                </>
              )}
            </button>

            <p className="crop-analysis-footer-note">
              {t("footer")}
            </p>
          </div>
        </div>

        {prediction && (
          <div className="crop-result-panel crop-prediction-panel">
            <div className="crop-result-content">
              <div className="crop-result-header">
                <span className="dashboard-kicker">
                  {t("report")}
                </span>

                <h2>{getResultTitle()}</h2>

                <p>{getResultDescription()}</p>
              </div>

              <div className="crop-result-summary">
                <div>
                  <span>{t("selectedField")}</span>
                  <strong>
                    {selectedField?.fieldName || t("unavailable")}
                  </strong>
                </div>

                <div>
                  <span>{t("registeredCrop")}</span>
                  <strong>{crop || t("unavailable")}</strong>
                </div>

                <div>
                  <span>{t("plantPartLabel")}</span>
                  <strong>{plantPartLabels[plantPart]}</strong>
                </div>

                <div>
                  <span>{t("identifiedCrop")}</span>
                  <strong>{prediction.crop || t("notIdentified")}</strong>
                </div>

                <div>
                  <span>{t("condition")}</span>
                  <strong>
                    {prediction.condition || t("notIdentified")}
                  </strong>
                </div>
              </div>

              <div className="crop-confidence-section">
                <div className="crop-confidence-heading">
                  <div>
                    <span>{t("confidence")}</span>
                    <h3>{confidencePercentage}%</h3>
                  </div>

                  <span className="crop-confidence-label">
                    {prediction.confidence_level || t("screening")}
                  </span>
                </div>

                <div className="crop-confidence-track">
                  <div
                    className="crop-confidence-fill"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(0, Number(confidencePercentage))
                      )}%`,
                    }}
                  />
                </div>

                <p>{t("confidenceNote")}</p>
              </div>

              {Array.isArray(prediction.top_predictions) &&
                prediction.top_predictions.length > 0 && (
                  <div className="crop-top-predictions">
                    <h3>{t("otherPredictions")}</h3>

                    {prediction.top_predictions.map((item, index) => (
                      <div
                        className="crop-prediction-row"
                        key={`${item.label}-${index}`}
                      >
                        <div>
                          <span>{item.label}</span>
                          <strong>
                            {Number(item.confidence).toFixed(2)}%
                          </strong>
                        </div>

                        <div className="crop-confidence-track">
                          <div
                            className="crop-confidence-fill"
                            style={{
                              width: `${Math.min(
                                100,
                                Math.max(0, Number(item.confidence))
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              {(prediction.warning || isCropMismatch || isLowConfidence) && (
                <div className="crop-result-warning">
                  <strong>
                    {isCropMismatch
                      ? t("verifyCrop")
                      : isLowConfidence
                        ? t("inspectFurther")
                        : t("important")}
                  </strong>

                  <p>
                    {prediction.warning || t("expertAdvice")}
                  </p>
                </div>
              )}

              <p className="crop-analysis-footer-note">
                {t("model")}: {prediction.model || t("model")}
                {" · "}
                {t("preliminary")}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CropImageAnalysis;
