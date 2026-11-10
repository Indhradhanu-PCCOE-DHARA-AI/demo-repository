
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import Logo from "../components/Logo";

const signupTranslations = {
  en: {
    backHome: "← Back to home",
    heading: "A clearer view",
    headingSecond: "of what matters.",
    sideDescription: "Intelligence for every field. Insight for every decision.",
    workspace: "YOUR DHARA-AI WORKSPACE",
    title: "Begin your journey.",
    subtitle: "Create an account to bring your farm into focus.",
    createAccount: "Create account",
    signIn: "Sign in",
    fullName: "FULL NAME",
    yourName: "Your name",
    email: "EMAIL ADDRESS",
    emailPlaceholder: "you@example.com",
    password: "PASSWORD",
    createPassword: "Create a password",
    confirmPassword: "CONFIRM PASSWORD",
    confirmPasswordPlaceholder: "Confirm your password",
    creating: "Creating account...",
    createMyAccount: "Create my account",
    legal: "By continuing, you agree to use DHARA-AI responsibly. Your farm information will be handled through your account.",
    footer: "SOLVING PROBLEMS FROM SKY TO SEED",
    nameError: "Please enter your full name.",
    passwordError: "Password must contain at least 8 characters.",
    mismatchError: "Passwords do not match. Please try again.",
    accountError: "Account creation failed. Please try again.",
    serverError: "Cannot connect to DHARA-AI server. Please check your backend.",
    incompleteResponse: "Incomplete server response.",
    language: "Language",
  },

  hi: {
    backHome: "← होम पर वापस जाएँ",
    heading: "हर चीज़ को",
    headingSecond: "बेहतर समझें।",
    sideDescription: "हर खेत के लिए जानकारी। हर निर्णय के लिए सही समझ।",
    workspace: "आपका DHARA-AI वर्कस्पेस",
    title: "अपनी यात्रा शुरू करें।",
    subtitle: "अपने खेत की जानकारी पाने के लिए अकाउंट बनाएँ।",
    createAccount: "अकाउंट बनाएँ",
    signIn: "साइन इन",
    fullName: "पूरा नाम",
    yourName: "अपना नाम लिखें",
    email: "ईमेल पता",
    emailPlaceholder: "you@example.com",
    password: "पासवर्ड",
    createPassword: "पासवर्ड बनाएँ",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    confirmPasswordPlaceholder: "पासवर्ड दोबारा लिखें",
    creating: "अकाउंट बनाया जा रहा है...",
    createMyAccount: "मेरा अकाउंट बनाएँ",
    legal: "आगे बढ़कर, आप DHARA-AI का जिम्मेदारी से उपयोग करने के लिए सहमत हैं। आपके खेत की जानकारी आपके अकाउंट के माध्यम से सुरक्षित रखी जाएगी।",
    footer: "आसमान से बीज तक, समस्याओं का समाधान",
    nameError: "कृपया अपना पूरा नाम लिखें।",
    passwordError: "पासवर्ड में कम से कम 8 अक्षर होने चाहिए।",
    mismatchError: "दोनों पासवर्ड मेल नहीं खाते। कृपया दोबारा प्रयास करें।",
    accountError: "अकाउंट नहीं बन पाया। कृपया दोबारा प्रयास करें।",
    serverError: "DHARA-AI सर्वर से कनेक्ट नहीं हो पा रहा है। कृपया बैकएंड जाँचें।",
    incompleteResponse: "सर्वर से अधूरी जानकारी प्राप्त हुई।",
    language: "भाषा",
  },

  mr: {
    backHome: "← मुख्यपृष्ठावर परत जा",
    heading: "प्रत्येक गोष्ट",
    headingSecond: "अधिक चांगल्या प्रकारे समजून घ्या.",
    sideDescription: "प्रत्येक शेतासाठी माहिती. प्रत्येक निर्णयासाठी योग्य मार्गदर्शन.",
    workspace: "तुमचे DHARA-AI वर्कस्पेस",
    title: "तुमचा प्रवास सुरू करा.",
    subtitle: "तुमच्या शेताची माहिती मिळवण्यासाठी खाते तयार करा.",
    createAccount: "खाते तयार करा",
    signIn: "साइन इन",
    fullName: "पूर्ण नाव",
    yourName: "तुमचे नाव लिहा",
    email: "ईमेल पत्ता",
    emailPlaceholder: "you@example.com",
    password: "पासवर्ड",
    createPassword: "पासवर्ड तयार करा",
    confirmPassword: "पासवर्डची पुष्टी करा",
    confirmPasswordPlaceholder: "पासवर्ड पुन्हा लिहा",
    creating: "खाते तयार होत आहे...",
    createMyAccount: "माझे खाते तयार करा",
    legal: "पुढे सुरू ठेवून, तुम्ही DHARA-AI चा जबाबदारीने वापर करण्यास सहमती देता. तुमच्या शेतीची माहिती तुमच्या खात्यामार्फत हाताळली जाईल.",
    footer: "आकाशापासून बियाण्यापर्यंत, समस्यांचे समाधान",
    nameError: "कृपया तुमचे पूर्ण नाव लिहा.",
    passwordError: "पासवर्डमध्ये किमान 8 अक्षरे असणे आवश्यक आहे.",
    mismatchError: "दोन्ही पासवर्ड जुळत नाहीत. कृपया पुन्हा प्रयत्न करा.",
    accountError: "खाते तयार करता आले नाही. कृपया पुन्हा प्रयत्न करा.",
    serverError: "DHARA-AI सर्व्हरशी जोडता येत नाही. कृपया बॅकएंड तपासा.",
    incompleteResponse: "सर्व्हरकडून अपूर्ण प्रतिसाद मिळाला.",
    language: "भाषा",
  },
};

function SignUp({ onAuthenticated }) {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();

  const t = signupTranslations[language] || signupTranslations.en;

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "")
      .trim()
      .toLowerCase();
    const password = String(formData.get("password") || "");
    const confirmPassword = String(
      formData.get("confirmPassword") || ""
    );

    if (name.length < 2) {
      setMessage(t.nameError);
      return;
    }

    if (password.length < 8) {
      setMessage(t.passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setMessage(t.mismatchError);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "https://dhara-ai-backend-l5lo.onrender.com/api/auth"}/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(data.message || t.accountError);
      }

      if (!data.token || !data.user) {
        throw new Error(t.incompleteResponse);
      }

      localStorage.setItem("dhara_token", data.token);
      localStorage.setItem("dhara_user", JSON.stringify(data.user));

      onAuthenticated(data.user);
      navigate("/onboarding", { replace: true });
    } catch (error) {
      setMessage(
        error.message === "Failed to fetch"
          ? t.serverError
          : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-side-visual">
        <button
          className="back-home"
          onClick={() => navigate("/home")}
        >
          {t.backHome}
        </button>

        <div className="auth-side-content">
          <Logo light />
          <span className="auth-side-line" />

          <h1>
            {t.heading}
            <br />
            of <em>{t.headingSecond}</em>
          </h1>

          <p>{t.sideDescription}</p>
        </div>

        <span className="auth-side-footer">
          {t.footer}
        </span>
      </div>

      <div className="auth-form-side">
        <div className="auth-mobile-logo">
          <Logo small />
        </div>

        <div className="auth-form-wrap">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "10px",
              marginBottom: "22px",
            }}
          >
            <label
              htmlFor="signup-language"
              style={{ fontSize: "13px", color: "inherit" }}
            >
              {t.language}
            </label>

            <select
              id="signup-language"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              aria-label={t.language}
              style={{
                padding: "9px 12px",
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
          </div>

          <div className="section-kicker">
            {t.workspace}
          </div>

          <h2>{t.title}</h2>

          <p className="auth-subtitle">
            {t.subtitle}
          </p>

          <div className="auth-switch">
            <Link to="/signup" className="active">
              {t.createAccount}
            </Link>

            <Link to="/signin">
              {t.signIn}
            </Link>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              {t.fullName}
              <input
                name="name"
                type="text"
                placeholder={t.yourName}
                minLength="2"
                maxLength="60"
                autoComplete="name"
                required
              />
            </label>

            <label>
              {t.email}
              <input
                name="email"
                type="email"
                placeholder={t.emailPlaceholder}
                autoComplete="email"
                required
              />
            </label>

            <label>
              {t.password}
              <input
                name="password"
                type="password"
                placeholder={t.createPassword}
                minLength="8"
                autoComplete="new-password"
                required
              />
            </label>

            <label>
              {t.confirmPassword}
              <input
                name="confirmPassword"
                type="password"
                placeholder={t.confirmPasswordPlaceholder}
                minLength="8"
                autoComplete="new-password"
                required
              />
            </label>

            <button
              type="submit"
              className="dark-button auth-submit"
              disabled={loading}
            >
              {loading ? t.creating : t.createMyAccount}

              {!loading && <span>↗</span>}
            </button>
          </form>

          {message && (
            <p className="auth-message" role="alert">
              {message}
            </p>
          )}

          <p className="auth-legal">
            {t.legal}
          </p>
        </div>

        <span className="auth-copyright">
          © 2026 DHARA-AI
        </span>
      </div>
    </main>
  );
}

export default SignUp;
