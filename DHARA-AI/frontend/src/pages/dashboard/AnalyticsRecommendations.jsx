
import "./AnalyticsRecommendations.css";
import { useLanguage } from "../../context/LanguageContext";

const translations = {
  en: {
    eyebrow: "INSIGHTS / FARM INTELLIGENCE",
    title: "Analytics & Recommendations",
    subtitle: "Understand your registered farm data and get practical suggestions for better crop management.",
    totalFields: "Registered Fields",
    totalArea: "Total Farm Area",
    cropTypes: "Crop Types",
    mappedLocations: "Mapped Locations",
    hectares: "Total registered area",
    uniqueCrops: "Different crops registered",
    savedLocations: "Saved farm locations",
    cropDistribution: "Crop Distribution",
    distributionDesc: "Registered crops across your farm",
    noCrops: "No crop information available yet.",
    fieldComparison: "Field-wise Overview",
    fieldDesc: "Compare the details of your registered fields.",
    field: "Field",
    crop: "Crop",
    area: "Area",
    soil: "Soil",
    irrigation: "Irrigation",
    latestDiagnosis: "Latest AI Diagnosis",
    diagnosisDesc: "Based on your most recent crop image analysis.",
    noDiagnosis: "No AI diagnosis available yet.",
    noDiagnosisDesc: "Upload a crop photograph in Crop Image Analysis to see your diagnosis here.",
    condition: "Detected condition",
    confidence: "Confidence",
    healthy: "Healthy",
    uncertain: "Uncertain",
    possibleDisease: "Possible disease",
    recommendations: "Farm Recommendations",
    recommendationsDesc: "Practical suggestions based on your available farm information.",
    general1: "Continue inspecting your crops regularly and record any unusual changes.",
    general2: "Monitor soil moisture and follow irrigation practices suitable for your crop and soil.",
    general3: "Keep photographs of your crops to compare their condition over time.",
    disease1: "Inspect nearby plants for similar symptoms and check whether the affected area is spreading.",
    disease2: "Avoid unnecessary overhead watering and maintain adequate airflow between plants.",
    disease3: "Consult a local agricultural expert before selecting a disease treatment.",
    healthy1: "Continue regular crop inspections to maintain healthy growth.",
    healthy2: "Maintain suitable irrigation and monitor soil moisture.",
    healthy3: "Keep monitoring for new symptoms even when the crop appears healthy.",
    fieldAttention: "Fields Requiring Attention",
    attentionDesc: "Fields associated with the latest AI diagnosis.",
    noAttention: "No field-specific warning is available.",
    dataNote: "Data availability",
    dataNoteText: "This page currently uses registered farm records and the latest available AI prediction. Live sensor measurements and historical satellite observations are not connected to this page yet.",
    notAvailable: "Not available",
    notSpecified: "Not specified",
    noField: "No registered fields found",
    healthyStatus: "No disease detected",
    warningStatus: "Review recommended",
    soilUnavailable: "Not specified",
    prototype: "Registered data",
    cropCount: "fields"
  },
  hi: {
    eyebrow: "जानकारी / कृषि बुद्धिमत्ता",
    title: "विश्लेषण और सुझाव",
    subtitle: "अपने खेत की पंजीकृत जानकारी समझें और बेहतर फसल प्रबंधन के लिए उपयोगी सुझाव पाएँ।",
    totalFields: "पंजीकृत खेत",
    totalArea: "कुल खेत का क्षेत्रफल",
    cropTypes: "फसलों के प्रकार",
    mappedLocations: "दर्ज स्थान",
    hectares: "कुल पंजीकृत क्षेत्र",
    uniqueCrops: "पंजीकृत अलग-अलग फसलें",
    savedLocations: "सहेजे गए खेत के स्थान",
    cropDistribution: "फसल वितरण",
    distributionDesc: "आपके खेत में पंजीकृत फसलें",
    noCrops: "अभी फसल की जानकारी उपलब्ध नहीं है।",
    fieldComparison: "खेत के अनुसार जानकारी",
    fieldDesc: "अपने पंजीकृत खेतों की तुलना करें।",
    field: "खेत",
    crop: "फसल",
    area: "क्षेत्रफल",
    soil: "मिट्टी",
    irrigation: "सिंचाई",
    latestDiagnosis: "नवीनतम एआई निदान",
    diagnosisDesc: "आपकी सबसे हाल की फसल तस्वीर के विश्लेषण पर आधारित।",
    noDiagnosis: "अभी एआई निदान उपलब्ध नहीं है।",
    noDiagnosisDesc: "यहाँ निदान देखने के लिए क्रॉप इमेज एनालिसिस में फसल की तस्वीर अपलोड करें।",
    condition: "पहचानी गई स्थिति",
    confidence: "विश्वास स्तर",
    healthy: "स्वस्थ",
    uncertain: "अनिश्चित",
    possibleDisease: "संभावित रोग",
    recommendations: "खेती के लिए सुझाव",
    recommendationsDesc: "आपके उपलब्ध खेत के डेटा पर आधारित उपयोगी सुझाव।",
    general1: "फसल का नियमित निरीक्षण करें और किसी भी असामान्य बदलाव का रिकॉर्ड रखें।",
    general2: "मिट्टी की नमी पर नज़र रखें और फसल तथा मिट्टी के अनुसार सिंचाई करें।",
    general3: "समय के साथ फसल की स्थिति की तुलना करने के लिए तस्वीरें सुरक्षित रखें।",
    disease1: "आसपास के पौधों में भी ऐसे लक्षण देखें और जाँचें कि प्रभावित क्षेत्र बढ़ तो नहीं रहा।",
    disease2: "अनावश्यक रूप से ऊपर से पानी देने से बचें और पौधों के बीच हवा का आवागमन बनाए रखें।",
    disease3: "रोग के उपचार का चुनाव करने से पहले स्थानीय कृषि विशेषज्ञ से सलाह लें।",
    healthy1: "फसल की अच्छी वृद्धि बनाए रखने के लिए नियमित निरीक्षण जारी रखें।",
    healthy2: "उचित सिंचाई बनाए रखें और मिट्टी की नमी जाँचते रहें।",
    healthy3: "फसल स्वस्थ दिखने पर भी नए लक्षणों की निगरानी करते रहें।",
    fieldAttention: "ध्यान देने योग्य खेत",
    attentionDesc: "नवीनतम एआई निदान से जुड़ा खेत।",
    noAttention: "खेत के लिए कोई विशेष चेतावनी उपलब्ध नहीं है।",
    dataNote: "डेटा की उपलब्धता",
    dataNoteText: "यह पृष्ठ अभी पंजीकृत खेत के रिकॉर्ड और नवीनतम उपलब्ध एआई परिणाम का उपयोग करता है। लाइव सेंसर रीडिंग और पुराने सैटेलाइट डेटा अभी इस पृष्ठ से जुड़े नहीं हैं।",
    notAvailable: "उपलब्ध नहीं",
    notSpecified: "निर्दिष्ट नहीं",
    noField: "कोई पंजीकृत खेत नहीं मिला",
    healthyStatus: "कोई रोग नहीं मिला",
    warningStatus: "जाँच की सलाह",
    soilUnavailable: "निर्दिष्ट नहीं",
    prototype: "पंजीकृत डेटा",
    cropCount: "खेत"
  },
  mr: {
    eyebrow: "माहिती / शेती बुद्धिमत्ता",
    title: "विश्लेषण आणि शिफारसी",
    subtitle: "तुमच्या नोंदणीकृत शेतीची माहिती समजून घ्या आणि पीक व्यवस्थापनासाठी उपयुक्त सूचना मिळवा.",
    totalFields: "नोंदणीकृत शेत",
    totalArea: "एकूण शेत क्षेत्र",
    cropTypes: "पिकांचे प्रकार",
    mappedLocations: "नोंदवलेली ठिकाणे",
    hectares: "एकूण नोंदणीकृत क्षेत्र",
    uniqueCrops: "नोंदणीकृत वेगवेगळी पिके",
    savedLocations: "जतन केलेली शेताची ठिकाणे",
    cropDistribution: "पीक वितरण",
    distributionDesc: "तुमच्या शेतातील नोंदणीकृत पिके",
    noCrops: "अद्याप पिकांची माहिती उपलब्ध नाही.",
    fieldComparison: "शेतनिहाय माहिती",
    fieldDesc: "तुमच्या नोंदणीकृत शेतांची तुलना करा.",
    field: "शेत",
    crop: "पीक",
    area: "क्षेत्र",
    soil: "माती",
    irrigation: "सिंचन",
    latestDiagnosis: "नवीनतम एआय निदान",
    diagnosisDesc: "तुमच्या अलीकडील पीक छायाचित्राच्या विश्लेषणावर आधारित.",
    noDiagnosis: "अद्याप एआय निदान उपलब्ध नाही.",
    noDiagnosisDesc: "येथे निदान पाहण्यासाठी क्रॉप इमेज ॲनालिसिसमध्ये पिकाचा फोटो अपलोड करा.",
    condition: "ओळखलेली स्थिती",
    confidence: "विश्वास पातळी",
    healthy: "निरोगी",
    uncertain: "अनिश्चित",
    possibleDisease: "संभाव्य रोग",
    recommendations: "शेतीसाठी सूचना",
    recommendationsDesc: "उपलब्ध शेतीच्या माहितीवर आधारित उपयुक्त सूचना.",
    general1: "पिकांची नियमित पाहणी करा आणि कोणतेही असामान्य बदल नोंदवा.",
    general2: "जमिनीतील ओलावा तपासा आणि पीक व मातीच्या गरजेनुसार सिंचन करा.",
    general3: "काळानुसार पिकांच्या स्थितीची तुलना करण्यासाठी फोटो जतन करा.",
    disease1: "आजूबाजूच्या झाडांवर अशी लक्षणे आहेत का आणि बाधित क्षेत्र वाढत आहे का ते तपासा.",
    disease2: "गरज नसताना वरून पाणी देणे टाळा आणि झाडांमध्ये हवा खेळती ठेवा.",
    disease3: "रोगावरील उपचार निवडण्यापूर्वी स्थानिक कृषी तज्ज्ञांचा सल्ला घ्या.",
    healthy1: "पिकांची चांगली वाढ टिकवण्यासाठी नियमित पाहणी सुरू ठेवा.",
    healthy2: "योग्य सिंचन करा आणि जमिनीतील ओलावा तपासत राहा.",
    healthy3: "पीक निरोगी दिसत असले तरी नवीन लक्षणांवर लक्ष ठेवा.",
    fieldAttention: "लक्ष देण्याची गरज असलेली शेते",
    attentionDesc: "नवीनतम एआय निदानाशी संबंधित शेत.",
    noAttention: "शेतासाठी कोणताही विशेष इशारा उपलब्ध नाही.",
    dataNote: "माहितीची उपलब्धता",
    dataNoteText: "हे पृष्ठ सध्या नोंदणीकृत शेतीच्या नोंदी आणि नवीनतम उपलब्ध एआय निष्कर्ष वापरते. थेट सेन्सर रीडिंग आणि ऐतिहासिक उपग्रह निरीक्षणे अद्याप या पृष्ठाशी जोडलेली नाहीत.",
    notAvailable: "उपलब्ध नाही",
    notSpecified: "नमूद केलेले नाही",
    noField: "नोंदणीकृत शेत आढळले नाही",
    healthyStatus: "रोग आढळला नाही",
    warningStatus: "तपासणी करण्याची शिफारस",
    soilUnavailable: "नमूद केलेले नाही",
    prototype: "नोंदणीकृत माहिती",
    cropCount: "शेते"
  }
};

const formatConfidence = (value) => {
  if (value === null || value === undefined || value === "") return null;
  const number = Number(value);
  if (Number.isNaN(number)) return null;
  return `${(number <= 1 ? number * 100 : number).toFixed(1)}%`;
};

const normalize = (value) =>
  String(value || "").toLowerCase().replaceAll("_", " ").replaceAll("-", " ").trim();

function translateDiseaseName(value, language) {
  const name = String(value || "")
    .toLowerCase()
    .replaceAll("___", " ")
    .replaceAll("_", " ")
    .replaceAll("-", " ");

  const diseases = [
    {
      match: "late blight",
      en: "Late Blight",
      hi: "पछेती झुलसा रोग",
      mr: "उशिराचा करपा रोग"
    },
    {
      match: "early blight",
      en: "Early Blight",
      hi: "अगेती झुलसा रोग",
      mr: "लवकर येणारा करपा रोग"
    },
    {
      match: "powdery mildew",
      en: "Powdery Mildew",
      hi: "चूर्णिल आसिता रोग",
      mr: "भुरी रोग"
    },
    {
      match: "leaf rust",
      en: "Leaf Rust",
      hi: "पत्ती का रतुआ रोग",
      mr: "पानावरील तांबेरा रोग"
    },
    {
      match: "bacterial leaf blight",
      en: "Bacterial Leaf Blight",
      hi: "जीवाणु जनित पत्ती झुलसा रोग",
      mr: "जिवाणूजन्य पानावरील करपा रोग"
    },
    {
      match: "leaf spot",
      en: "Leaf Spot",
      hi: "पत्ती धब्बा रोग",
      mr: "पानावरील ठिपक्यांचा रोग"
    },
    {
      match: "healthy",
      en: "Healthy",
      hi: "स्वस्थ",
      mr: "निरोगी"
    }
  ];

  const match = diseases.find((disease) =>
    name.includes(disease.match)
  );

  return match
    ? match[language] || match.en
    : formatDiseaseName(value);
}

function AnalyticsRecommendations({
  farmer,
  fields = [],
  locations = [],
  prediction
}) {
  const { language } = useLanguage();
  const lang = translations[language] ? language : "en";
  const t = (key) => translations[lang][key] || translations.en[key] || key;

  const totalArea = fields.reduce(
    (sum, field) => sum + (Number(field.area) || 0),
    0
  );

  const cropGroups = fields.reduce((groups, field) => {
    const crop = field.cropName || t("notSpecified");
    groups[crop] = (groups[crop] || 0) + 1;
    return groups;
  }, {});

  const cropEntries = Object.entries(cropGroups).sort(
    (a, b) => b[1] - a[1]
  );

  const maxCropCount = Math.max(1, ...cropEntries.map((item) => item[1]));

  const condition = prediction?.condition || prediction?.class_name || "";
  const normalizedCondition = normalize(condition);

  const isHealthy =
    normalizedCondition.includes("healthy") ||
    normalizedCondition.includes("normal") ||
    normalizedCondition.includes("no disease");

  const isUncertain =
    normalizedCondition.includes("unknown") ||
    normalizedCondition.includes("uncertain") ||
    normalizedCondition.includes("unidentified");

  const diagnosisLabel = !prediction
    ? t("noDiagnosis")
    : isHealthy
      ? t("healthy")
      : isUncertain
        ? t("uncertain")
        : t("possibleDisease");

  const confidence = formatConfidence(
    prediction?.confidence ?? prediction?.prediction_confidence
  );

  const recommendations = prediction
    ? isHealthy
      ? [t("healthy1"), t("healthy2"), t("healthy3")]
      : [t("disease1"), t("disease2"), t("disease3")]
    : [t("general1"), t("general2"), t("general3")];

  const selectedField = fields.find(
    (field) => String(field._id) === String(prediction?.fieldId)
  );

  const attentionField = selectedField || null;

  return (
    <section className="analytics-page">
      <div className="analytics-heading">
        <span className="analytics-eyebrow">{t("eyebrow")}</span>
        <h1>{t("title")}</h1>
        <p>{t("subtitle")}</p>
      </div>

      <div className="analytics-metric-grid">
        <article className="analytics-metric-card metric-green">
          <span className="analytics-metric-icon">▧</span>
          <span className="analytics-metric-label">{t("totalFields")}</span>
          <strong>{fields.length}</strong>
          <small>{t("prototype")}</small>
        </article>

        <article className="analytics-metric-card metric-yellow">
          <span className="analytics-metric-icon">⌖</span>
          <span className="analytics-metric-label">{t("totalArea")}</span>
          <strong>{totalArea.toFixed(2)}</strong>
          <small>{t("hectares")}</small>
        </article>

        <article className="analytics-metric-card metric-lilac">
          <span className="analytics-metric-icon">🌱</span>
          <span className="analytics-metric-label">{t("cropTypes")}</span>
          <strong>{cropEntries.length}</strong>
          <small>{t("uniqueCrops")}</small>
        </article>

        <article className="analytics-metric-card metric-blue">
          <span className="analytics-metric-icon">⌖</span>
          <span className="analytics-metric-label">{t("mappedLocations")}</span>
          <strong>{locations.length}</strong>
          <small>{t("savedLocations")}</small>
        </article>
      </div>

      <div className="analytics-main-grid">
        <article className="analytics-panel">
          <div className="analytics-panel-heading">
            <div>
              <span>{t("prototype")}</span>
              <h2>{t("cropDistribution")}</h2>
              <p>{t("distributionDesc")}</p>
            </div>
            <span className="analytics-panel-symbol">◒</span>
          </div>

          {cropEntries.length > 0 ? (
            <div className="analytics-crop-chart">
              {cropEntries.map(([crop, count]) => (
                <div className="analytics-crop-bar-row" key={crop}>
                  <div className="analytics-crop-bar-label">
                    <strong>{crop}</strong>
                    <span>{count} {t("cropCount")}</span>
                  </div>
                  <div className="analytics-bar-track">
                    <div
                      className="analytics-bar-fill"
                      style={{ width: `${(count / maxCropCount) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="analytics-empty">{t("noCrops")}</div>
          )}
        </article>

        <article className="analytics-panel analytics-diagnosis-panel">
          <div className="analytics-panel-heading">
            <div>
              <span>{t("latestDiagnosis")}</span>
              <h2>{t("condition")}</h2>
              <p>{t("diagnosisDesc")}</p>
            </div>
            <span className="analytics-panel-symbol">✳</span>
          </div>

          {prediction ? (
            <>
              <div className={`analytics-diagnosis-status ${
                isHealthy ? "is-healthy" : isUncertain ? "is-uncertain" : "is-warning"
              }`}>
                <span />
                {diagnosisLabel}
              </div>
              <h3 className="analytics-disease-name">
  {translateDiseaseName(condition, lang)}
</h3>
              <div className="analytics-diagnosis-meta">
                <div>
                  <small>{t("crop")}</small>
                  <strong>{prediction.selectedCrop || prediction.crop || t("notAvailable")}</strong>
                </div>
                <div>
                  <small>{t("confidence")}</small>
                  <strong>{confidence || t("notAvailable")}</strong>
                </div>
              </div>
            </>
          ) : (
            <div className="analytics-empty">
              <strong>{t("noDiagnosis")}</strong>
              <p>{t("noDiagnosisDesc")}</p>
            </div>
          )}
        </article>
      </div>

      <article className="analytics-panel analytics-fields-panel">
        <div className="analytics-panel-heading">
          <div>
            <span>{t("fieldComparison")}</span>
            <h2>{t("fieldDesc")}</h2>
          </div>
          <span className="analytics-panel-symbol">▤</span>
        </div>

        {fields.length > 0 ? (
          <div className="analytics-table-wrap">
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>{t("field")}</th>
                  <th>{t("crop")}</th>
                  <th>{t("area")}</th>
                  <th>{t("soil")}</th>
                  <th>{t("irrigation")}</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((field) => (
                  <tr key={field._id}>
                    <td>{field.fieldName || t("notSpecified")}</td>
                    <td>{field.cropName || t("notSpecified")}</td>
                    <td>{Number(field.area || 0).toFixed(2)}</td>
                    <td>{field.soilType || t("notSpecified")}</td>
                    <td>{field.irrigationMethod || t("notSpecified")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="analytics-empty">{t("noField")}</div>
        )}
      </article>

      <div className="analytics-bottom-grid">
        <article className="analytics-panel analytics-recommendations-panel">
          <div className="analytics-panel-heading">
            <div>
              <span>{t("recommendations")}</span>
              <h2>{t("recommendationsDesc")}</h2>
            </div>
            <span className="analytics-panel-symbol">✧</span>
          </div>

          <div className="analytics-recommendation-list">
            {recommendations.map((item, index) => (
              <div className="analytics-recommendation" key={index}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="analytics-panel analytics-attention-panel">
          <div className="analytics-panel-heading">
            <div>
              <span>{t("fieldAttention")}</span>
              <h2>{t("attentionDesc")}</h2>
            </div>
            <span className="analytics-panel-symbol">⌖</span>
          </div>

          {attentionField ? (
            <div className="analytics-attention-field">
              <span className="analytics-attention-tag">
                {isHealthy ? t("healthyStatus") : t("warningStatus")}
              </span>
              <h3>{attentionField.fieldName}</h3>
              <p>{attentionField.cropName} · {attentionField.area}</p>
            </div>
          ) : (
            <div className="analytics-empty">{t("noAttention")}</div>
          )}
        </article>
      </div>

      <div className="analytics-data-note">
        <span>i</span>
        <div>
          <strong>{t("dataNote")}</strong>
          <p>{t("dataNoteText")}</p>
        </div>
      </div>
    </section>
  );
}

function formatDiseaseName(value) {
  if (!value) return "Not available";
  return String(value)
    .replaceAll("___", " ")
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default AnalyticsRecommendations;
