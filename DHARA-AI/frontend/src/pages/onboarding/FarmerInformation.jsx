
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import Logo from "../../components/Logo";
import "./FarmerInformation.css";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "https://dhara-ai-backend-l5lo.onrender.com/api/auth"
).replace(/\/auth\/?$/, "");

const farmerTranslations = {
  en: {
    language: "Language",
    back: "← Back to setup",
    kicker: "ONBOARDING / STEP 01",
    heading: "About",
    headingEm: "you.",
    intro:
      "Let's start with the person behind the farm. Tell us a little about yourself and your farming background.",
    step: "STEP 1 OF 3",
    personal: "Personal information",
    personalDesc: "Basic details to identify your farmer profile.",
    fullName: "FULL NAME *",
    fullNamePlaceholder: "Enter your full name",
    phone: "PHONE NUMBER *",
    phonePlaceholder: "10-digit mobile number",
    email: "EMAIL ADDRESS",
    emailPlaceholder: "you@example.com",
    age: "AGE",
    agePlaceholder: "Your age",
    gender: "GENDER",
    selectOption: "Select an option",
    male: "Male",
    female: "Female",
    other: "Other",
    preferNot: "Prefer not to say",
    experience: "FARMING EXPERIENCE",
    selectExperience: "Select experience",
    years02: "0–2 years",
    years35: "3–5 years",
    years610: "6–10 years",
    years10: "More than 10 years",
    background: "Farming background",
    backgroundDesc: "Help us understand your agricultural practices.",
    farmingType: "TYPE OF FARMING",
    selectFarming: "Select farming type",
    traditional: "Traditional farming",
    organic: "Organic farming",
    mixed: "Mixed farming",
    modern: "Modern / Precision farming",
    address: "FARMER ADDRESS",
    addressPlaceholder: "Village, Taluka, District, State",
    cancel: "Cancel",
    saving: "Saving...",
    save: "Save information",
    sessionExpired: "Your session has expired. Please sign in again.",
    saveError: "Unable to save farmer information.",
    generalError: "Something went wrong. Please try again.",
  },

  hi: {
    language: "भाषा",
    back: "← सेटअप पर वापस जाएँ",
    kicker: "पंजीकरण / चरण 01",
    heading: "आपके",
    headingEm: "बारे में।",
    intro:
      "आइए सबसे पहले किसान के बारे में जानें। अपने और अपने खेती के अनुभव के बारे में कुछ जानकारी दें।",
    step: "चरण 1 / 3",
    personal: "व्यक्तिगत जानकारी",
    personalDesc: "आपकी किसान प्रोफ़ाइल के लिए आवश्यक बुनियादी जानकारी।",
    fullName: "पूरा नाम *",
    fullNamePlaceholder: "अपना पूरा नाम दर्ज करें",
    phone: "फोन नंबर *",
    phonePlaceholder: "10 अंकों का मोबाइल नंबर",
    email: "ईमेल पता",
    emailPlaceholder: "you@example.com",
    age: "उम्र",
    agePlaceholder: "अपनी उम्र दर्ज करें",
    gender: "लिंग",
    selectOption: "एक विकल्प चुनें",
    male: "पुरुष",
    female: "महिला",
    other: "अन्य",
    preferNot: "बताना नहीं चाहते",
    experience: "खेती का अनुभव",
    selectExperience: "अनुभव चुनें",
    years02: "0–2 वर्ष",
    years35: "3–5 वर्ष",
    years610: "6–10 वर्ष",
    years10: "10 वर्ष से अधिक",
    background: "खेती की पृष्ठभूमि",
    backgroundDesc: "हमें अपनी खेती की पद्धतियों को समझने में मदद करें।",
    farmingType: "खेती का प्रकार",
    selectFarming: "खेती का प्रकार चुनें",
    traditional: "पारंपरिक खेती",
    organic: "जैविक खेती",
    mixed: "मिश्रित खेती",
    modern: "आधुनिक / सटीक खेती",
    address: "किसान का पता",
    addressPlaceholder: "गाँव, तालुका, जिला, राज्य",
    cancel: "रद्द करें",
    saving: "सेव हो रहा है...",
    save: "जानकारी सेव करें",
    sessionExpired: "आपका सेशन समाप्त हो गया है। कृपया दोबारा साइन इन करें।",
    saveError: "किसान की जानकारी सेव नहीं हो सकी।",
    generalError: "कुछ गलत हुआ। कृपया दोबारा प्रयास करें।",
  },

  mr: {
    language: "भाषा",
    back: "← सेटअपवर परत जा",
    kicker: "नोंदणी / टप्पा 01",
    heading: "तुमच्याबद्दल",
    headingEm: "माहिती.",
    intro:
      "चला, सर्वप्रथम शेतकऱ्याबद्दल जाणून घेऊया. तुमच्याबद्दल आणि तुमच्या शेतीच्या अनुभवाबद्दल थोडी माहिती द्या.",
    step: "टप्पा 1 / 3",
    personal: "वैयक्तिक माहिती",
    personalDesc: "तुमची शेतकरी प्रोफाइल तयार करण्यासाठी आवश्यक माहिती.",
    fullName: "पूर्ण नाव *",
    fullNamePlaceholder: "तुमचे पूर्ण नाव लिहा",
    phone: "फोन नंबर *",
    phonePlaceholder: "10 अंकी मोबाईल नंबर",
    email: "ईमेल पत्ता",
    emailPlaceholder: "you@example.com",
    age: "वय",
    agePlaceholder: "तुमचे वय लिहा",
    gender: "लिंग",
    selectOption: "पर्याय निवडा",
    male: "पुरुष",
    female: "स्त्री",
    other: "इतर",
    preferNot: "सांगू इच्छित नाही",
    experience: "शेतीचा अनुभव",
    selectExperience: "अनुभव निवडा",
    years02: "0–2 वर्षे",
    years35: "3–5 वर्षे",
    years610: "6–10 वर्षे",
    years10: "10 वर्षांपेक्षा जास्त",
    background: "शेतीची पार्श्वभूमी",
    backgroundDesc: "तुमच्या शेतीच्या पद्धती समजून घेण्यासाठी आम्हाला मदत करा.",
    farmingType: "शेतीचा प्रकार",
    selectFarming: "शेतीचा प्रकार निवडा",
    traditional: "पारंपरिक शेती",
    organic: "सेंद्रिय शेती",
    mixed: "मिश्र शेती",
    modern: "आधुनिक / अचूक शेती",
    address: "शेतकऱ्याचा पत्ता",
    addressPlaceholder: "गाव, तालुका, जिल्हा, राज्य",
    cancel: "रद्द करा",
    saving: "माहिती सेव्ह होत आहे...",
    save: "माहिती सेव्ह करा",
    sessionExpired: "तुमचे सत्र संपले आहे. कृपया पुन्हा साइन इन करा.",
    saveError: "शेतकऱ्याची माहिती सेव्ह करता आली नाही.",
    generalError: "काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा.",
  },
};

function FarmerInformation() {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();

  const t =
    farmerTranslations[language] || farmerTranslations.en;

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    age: "",
    gender: "",
    experience: "",
    farmingType: "",
    address: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
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

    const token = localStorage.getItem("dhara_token");

    if (!token) {
      setMessage(t.sessionExpired);
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/farmer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || t.saveError);
      }

      localStorage.setItem("dhara_farmer_completed", "true");

      navigate("/onboarding", { replace: true });

    } catch (error) {
      console.error("Farmer Submission Error:", error);

      setMessage(
        error.message || t.generalError
      );
      setMessageType("error");

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
            <span />
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
              <h2>{t.personal}</h2>
              <p>{t.personalDesc}</p>
            </div>
          </div>

          <div className="form-grid">
            <label>
              {t.fullName}
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder={t.fullNamePlaceholder}
                minLength={2}
                maxLength={100}
                required
              />
            </label>

            <label>
              {t.phone}
              <input
                name="phone"
                type="tel"
                inputMode="numeric"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t.phonePlaceholder}
                pattern="[0-9]{10}"
                maxLength={10}
                required
              />
            </label>

            <label>
              {t.email}
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t.emailPlaceholder}
              />
            </label>

            <label>
              {t.age}
              <input
                name="age"
                type="number"
                min="18"
                max="100"
                value={formData.age}
                onChange={handleChange}
                placeholder={t.agePlaceholder}
              />
            </label>

            <label>
              {t.gender}
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">{t.selectOption}</option>
                <option value="male">{t.male}</option>
                <option value="female">{t.female}</option>
                <option value="other">{t.other}</option>
                <option value="prefer_not_to_say">
                  {t.preferNot}
                </option>
              </select>
            </label>

            <label>
              {t.experience}
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
              >
                <option value="">{t.selectExperience}</option>
                <option value="0-2">{t.years02}</option>
                <option value="3-5">{t.years35}</option>
                <option value="6-10">{t.years610}</option>
                <option value="10+">{t.years10}</option>
              </select>
            </label>
          </div>

          <div className="form-section-heading second">
            <span>02</span>
            <div>
              <h2>{t.background}</h2>
              <p>{t.backgroundDesc}</p>
            </div>
          </div>

          <div className="form-grid">
            <label>
              {t.farmingType}
              <select
                name="farmingType"
                value={formData.farmingType}
                onChange={handleChange}
              >
                <option value="">{t.selectFarming}</option>
                <option value="traditional">{t.traditional}</option>
                <option value="organic">{t.organic}</option>
                <option value="mixed">{t.mixed}</option>
                <option value="modern">{t.modern}</option>
                <option value="other">{t.other}</option>
              </select>
            </label>

            <label className="full-width">
              {t.address}
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder={t.addressPlaceholder}
                rows="3"
                maxLength={500}
              />
            </label>
          </div>

          {message && (
            <p
              className="form-message"
              role="status"
              style={{
                color:
                  messageType === "success"
                    ? "#347747"
                    : "#b44444",
              }}
            >
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
              {!loading && <span> ↗</span>}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default FarmerInformation;
