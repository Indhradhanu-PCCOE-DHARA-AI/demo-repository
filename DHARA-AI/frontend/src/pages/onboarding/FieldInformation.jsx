
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import Logo from "../../components/Logo";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "https://dhara-ai-backend-l5lo.onrender.com/api/auth"
).replace(/\/auth\/?$/, "");

const fieldTranslations = {
  en: {
    language: "Language",
    back: "← Back to setup",
    kicker: "ONBOARDING / STEP 02",
    heading: "About your",
    headingEm: "field.",
    intro:
      "Every field is different. Tell us about your land and the crops you're growing so DHARA can understand your agricultural needs.",
    step: "STEP 2 OF 3",
    fieldDetails: "Field details",
    fieldDetailsDesc: "Basic information about your agricultural land.",
    fieldName: "FIELD NAME *",
    fieldNamePlaceholder: "e.g. North Field",
    fieldArea: "TOTAL FIELD AREA *",
    areaPlaceholder: "Enter land area",
    areaUnit: "Area unit",
    acres: "Acres",
    hectares: "Hectares",
    guntha: "Guntha",
    cropName: "CROP NAME *",
    cropPlaceholder: "e.g. Wheat, Rice, Cotton",
    cropVariety: "CROP VARIETY",
    varietyPlaceholder: "Enter crop variety",
    sowingDate: "SOWING DATE",
    farmingSeason: "FARMING SEASON",
    selectSeason: "Select season",
    kharif: "Kharif",
    rabi: "Rabi",
    zaid: "Zaid",
    yearRound: "Year-round",
    soilIrrigation: "Soil & irrigation",
    soilDesc: "Understand the growing conditions of your field.",
    soilType: "SOIL TYPE *",
    selectSoil: "Select soil type",
    black: "Black soil",
    red: "Red soil",
    alluvial: "Alluvial soil",
    sandy: "Sandy soil",
    clay: "Clay soil",
    loamy: "Loamy soil",
    otherUnsure: "Other / Not sure",
    irrigation: "IRRIGATION METHOD *",
    selectIrrigation: "Select irrigation method",
    drip: "Drip irrigation",
    sprinkler: "Sprinkler irrigation",
    flood: "Flood irrigation",
    rainfed: "Rainfed",
    other: "Other",
    cancel: "Cancel",
    saving: "Saving...",
    save: "Save field details",
    sessionExpired: "Your session has expired. Please sign in again.",
    saveError: "Unable to save field information.",
    success: "Field information saved successfully!",
    generalError: "Something went wrong. Please try again.",
  },

  hi: {
    language: "भाषा",
    back: "← सेटअप पर वापस जाएँ",
    kicker: "पंजीकरण / चरण 02",
    heading: "आपके",
    headingEm: "खेत के बारे में।",
    intro:
      "हर खेत अलग होता है। हमें अपनी ज़मीन और उगाई जाने वाली फसलों के बारे में बताएँ, ताकि DHARA आपकी कृषि संबंधी ज़रूरतों को समझ सके।",
    step: "चरण 2 / 3",
    fieldDetails: "खेत का विवरण",
    fieldDetailsDesc: "आपकी कृषि भूमि की बुनियादी जानकारी।",
    fieldName: "खेत का नाम *",
    fieldNamePlaceholder: "जैसे: उत्तरी खेत",
    fieldArea: "खेत का कुल क्षेत्रफल *",
    areaPlaceholder: "खेत का क्षेत्रफल दर्ज करें",
    areaUnit: "क्षेत्रफल की इकाई",
    acres: "एकड़",
    hectares: "हेक्टेयर",
    guntha: "गुंठा",
    cropName: "फसल का नाम *",
    cropPlaceholder: "जैसे: गेहूँ, चावल, कपास",
    cropVariety: "फसल की किस्म",
    varietyPlaceholder: "फसल की किस्म दर्ज करें",
    sowingDate: "बुवाई की तारीख",
    farmingSeason: "खेती का मौसम",
    selectSeason: "मौसम चुनें",
    kharif: "खरीफ",
    rabi: "रबी",
    zaid: "जायद",
    yearRound: "पूरे साल",
    soilIrrigation: "मिट्टी और सिंचाई",
    soilDesc: "अपने खेत की मिट्टी और फसल उगाने की परिस्थितियों के बारे में बताएँ।",
    soilType: "मिट्टी का प्रकार *",
    selectSoil: "मिट्टी का प्रकार चुनें",
    black: "काली मिट्टी",
    red: "लाल मिट्टी",
    alluvial: "जलोढ़ मिट्टी",
    sandy: "रेतीली मिट्टी",
    clay: "चिकनी मिट्टी",
    loamy: "दोमट मिट्टी",
    otherUnsure: "अन्य / निश्चित नहीं",
    irrigation: "सिंचाई का तरीका *",
    selectIrrigation: "सिंचाई का तरीका चुनें",
    drip: "ड्रिप सिंचाई",
    sprinkler: "स्प्रिंकलर सिंचाई",
    flood: "बाढ़ सिंचाई",
    rainfed: "वर्षा आधारित",
    other: "अन्य",
    cancel: "रद्द करें",
    saving: "सेव हो रहा है...",
    save: "खेत की जानकारी सेव करें",
    sessionExpired: "आपका सेशन समाप्त हो गया है। कृपया दोबारा साइन इन करें।",
    saveError: "खेत की जानकारी सेव नहीं हो सकी।",
    success: "खेत की जानकारी सफलतापूर्वक सेव हो गई!",
    generalError: "कुछ गलत हुआ। कृपया दोबारा प्रयास करें।",
  },

  mr: {
    language: "भाषा",
    back: "← सेटअपवर परत जा",
    kicker: "नोंदणी / टप्पा 02",
    heading: "तुमच्या",
    headingEm: "शेताबद्दल.",
    intro:
      "प्रत्येक शेत वेगळे असते. तुमची जमीन आणि तुम्ही घेत असलेल्या पिकांची माहिती द्या, जेणेकरून DHARA तुमच्या शेतीच्या गरजा समजू शकेल.",
    step: "टप्पा 2 / 3",
    fieldDetails: "शेताची माहिती",
    fieldDetailsDesc: "तुमच्या शेतीच्या जमिनीची मूलभूत माहिती.",
    fieldName: "शेताचे नाव *",
    fieldNamePlaceholder: "उदा. उत्तर बाजूचे शेत",
    fieldArea: "शेताचे एकूण क्षेत्रफळ *",
    areaPlaceholder: "शेताचे क्षेत्रफळ लिहा",
    areaUnit: "क्षेत्रफळाचे एकक",
    acres: "एकर",
    hectares: "हेक्टर",
    guntha: "गुंठा",
    cropName: "पिकाचे नाव *",
    cropPlaceholder: "उदा. गहू, तांदूळ, कापूस",
    cropVariety: "पिकाची जात",
    varietyPlaceholder: "पिकाची जात लिहा",
    sowingDate: "पेरणीची तारीख",
    farmingSeason: "हंगाम",
    selectSeason: "हंगाम निवडा",
    kharif: "खरीप",
    rabi: "रब्बी",
    zaid: "उन्हाळी (जायद)",
    yearRound: "वर्षभर",
    soilIrrigation: "माती आणि सिंचन",
    soilDesc: "तुमच्या शेतातील माती आणि पीक वाढीच्या परिस्थितीची माहिती द्या.",
    soilType: "मातीचा प्रकार *",
    selectSoil: "मातीचा प्रकार निवडा",
    black: "काळी माती",
    red: "लाल माती",
    alluvial: "गाळाची माती",
    sandy: "वाळूमिश्रित माती",
    clay: "चिकणमाती",
    loamy: "पोयट्याची माती",
    otherUnsure: "इतर / खात्री नाही",
    irrigation: "सिंचन पद्धत *",
    selectIrrigation: "सिंचन पद्धत निवडा",
    drip: "ठिबक सिंचन",
    sprinkler: "तुषार सिंचन",
    flood: "पाटाने सिंचन",
    rainfed: "पावसावर आधारित",
    other: "इतर",
    cancel: "रद्द करा",
    saving: "माहिती सेव्ह होत आहे...",
    save: "शेताची माहिती सेव्ह करा",
    sessionExpired: "तुमचे सत्र संपले आहे. कृपया पुन्हा साइन इन करा.",
    saveError: "शेताची माहिती सेव्ह करता आली नाही.",
    success: "शेताची माहिती यशस्वीरित्या सेव्ह झाली!",
    generalError: "काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा.",
  },
};

function FieldInformation() {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();

  const t =
    fieldTranslations[language] || fieldTranslations.en;

  const [formData, setFormData] = useState({
    fieldName: "",
    cropName: "",
    cropVariety: "",
    fieldArea: "",
    areaUnit: "acre",
    sowingDate: "",
    soilType: "",
    irrigationType: "",
    farmingSeason: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const token = localStorage.getItem("dhara_token");

      if (!token) {
        setMessage(t.sessionExpired);
        return;
      }

      // Convert all area units into acres for consistent storage.
      const conversionToAcres = {
        acre: 1,
        hectare: 2.47105,
        guntha: 0.025,
      };

      const areaInAcres =
        Number(formData.fieldArea) *
        conversionToAcres[formData.areaUnit];

      const payload = {
        fieldName: formData.fieldName.trim(),
        cropName: formData.cropName.trim(),
        cropVariety: formData.cropVariety.trim(),
        area: areaInAcres,
        soilType: formData.soilType,
        irrigationMethod: formData.irrigationType,
      };

      const response = await fetch(`${API_BASE_URL}/field`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t.saveError);
      }

      localStorage.setItem("dhara_field_completed", "true");

      setMessage(t.success);

      setTimeout(() => {
        navigate("/onboarding", { replace: true });
      }, 1000);

    } catch (error) {
      console.error("Field Information Error:", error);

      setMessage(
        error.message || t.generalError
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="onboarding-form-page">
      <header className="onboarding-header">
        <Logo small />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            aria-label={t.language}
            style={{
              padding: "8px 10px",
              borderRadius: "8px",
              border: "1px solid #d5ded6",
              background: "white",
              color: "#203b2b",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="mr">मराठी</option>
          </select>

          <button
            type="button"
            className="form-back-button"
            onClick={() => navigate("/onboarding")}
          >
            {t.back}
          </button>
        </div>
      </header>

      <section className="form-container">
        <div className="form-intro">
          <span className="section-kicker">
            {t.kicker}
          </span>

          <h1>
            {t.heading} <em>{t.headingEm}</em>
          </h1>

          <p>{t.intro}</p>

          <div className="form-step-indicator">
            <span className="active" />
            <span className="active" />
            <span />
            <small>{t.step}</small>
          </div>
        </div>

        <form
          className="farmer-form"
          onSubmit={handleSubmit}
        >
          <div className="form-section-heading">
            <span>01</span>
            <div>
              <h2>{t.fieldDetails}</h2>
              <p>{t.fieldDetailsDesc}</p>
            </div>
          </div>

          <div className="form-grid">
            <label>
              {t.fieldName}
              <input
                name="fieldName"
                value={formData.fieldName}
                onChange={handleChange}
                placeholder={t.fieldNamePlaceholder}
                required
              />
            </label>

            <label>
              {t.fieldArea}
              <div className="input-with-select">
                <input
                  name="fieldArea"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={formData.fieldArea}
                  onChange={handleChange}
                  placeholder={t.areaPlaceholder}
                  required
                />

                <select
                  name="areaUnit"
                  value={formData.areaUnit}
                  onChange={handleChange}
                  aria-label={t.areaUnit}
                >
                  <option value="acre">{t.acres}</option>
                  <option value="hectare">{t.hectares}</option>
                  <option value="guntha">{t.guntha}</option>
                </select>
              </div>
            </label>

            <label>
              {t.cropName}
              <input
                name="cropName"
                value={formData.cropName}
                onChange={handleChange}
                placeholder={t.cropPlaceholder}
                required
              />
            </label>

            <label>
              {t.cropVariety}
              <input
                name="cropVariety"
                value={formData.cropVariety}
                onChange={handleChange}
                placeholder={t.varietyPlaceholder}
              />
            </label>

            <label>
              {t.sowingDate}
              <input
                name="sowingDate"
                type="date"
                value={formData.sowingDate}
                onChange={handleChange}
              />
            </label>

            <label>
              {t.farmingSeason}
              <select
                name="farmingSeason"
                value={formData.farmingSeason}
                onChange={handleChange}
              >
                <option value="">{t.selectSeason}</option>
                <option value="kharif">{t.kharif}</option>
                <option value="rabi">{t.rabi}</option>
                <option value="zaid">{t.zaid}</option>
                <option value="year_round">{t.yearRound}</option>
              </select>
            </label>
          </div>

          <div className="form-section-heading second">
            <span>02</span>
            <div>
              <h2>{t.soilIrrigation}</h2>
              <p>{t.soilDesc}</p>
            </div>
          </div>

          <div className="form-grid">
            <label>
              {t.soilType}
              <select
                name="soilType"
                value={formData.soilType}
                onChange={handleChange}
                required
              >
                <option value="">{t.selectSoil}</option>
                <option value="black">{t.black}</option>
                <option value="red">{t.red}</option>
                <option value="alluvial">{t.alluvial}</option>
                <option value="sandy">{t.sandy}</option>
                <option value="clay">{t.clay}</option>
                <option value="loamy">{t.loamy}</option>
                <option value="other">{t.otherUnsure}</option>
              </select>
            </label>

            <label>
              {t.irrigation}
              <select
                name="irrigationType"
                value={formData.irrigationType}
                onChange={handleChange}
                required
              >
                <option value="">{t.selectIrrigation}</option>
                <option value="drip">{t.drip}</option>
                <option value="sprinkler">{t.sprinkler}</option>
                <option value="flood">{t.flood}</option>
                <option value="rainfed">{t.rainfed}</option>
                <option value="other">{t.other}</option>
              </select>
            </label>
          </div>

          {message && (
            <p className="form-message" role="status">
              {message}
            </p>
          )}

          <div className="form-actions">
            <button
              type="button"
              className="form-secondary-button"
              onClick={() => navigate("/onboarding")}
              disabled={loading}
            >
              {t.cancel}
            </button>

            <button
              type="submit"
              className="dark-button"
              disabled={loading}
            >
              {loading ? t.saving : t.save}
              {!loading && <span>↗</span>}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default FieldInformation;
