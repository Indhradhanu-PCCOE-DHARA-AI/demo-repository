
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import Logo from "../components/Logo";

const signinTranslations = {
  en: {
    backHome: "← Back to home",
    heading: "A clearer view",
    headingSecond: "of what matters.",
    sideDescription: "Intelligence for every field. Insight for every decision.",
    footer: "SOLVING PROBLEMS FROM SKY TO SEED",
    workspace: "YOUR DHARA-AI WORKSPACE",
    title: "Welcome back.",
    subtitle: "Sign in to continue to your farm workspace.",
    createAccount: "Create account",
    signIn: "Sign in",
    email: "EMAIL ADDRESS",
    emailPlaceholder: "you@example.com",
    password: "PASSWORD",
    passwordPlaceholder: "Enter your password",
    secureAccess: "Secure access to your workspace",
    forgotPassword: "Forgot password?",
    pleaseWait: "Please wait...",
    signInButton: "Sign in to DHARA-AI",
    legal: "By continuing, you agree to use DHARA-AI responsibly. Your farm information will be handled through your account.",
    passwordError: "Password must contain at least 8 characters.",
    invalidCredentials: "Invalid email or password.",
    incompleteResponse: "Incomplete server response.",
    serverError: "Cannot connect to DHARA-AI server. Please check your backend.",
    recoveryError: "Password recovery is not available yet. Please contact the administrator.",
    language: "Language",
  },

  hi: {
    backHome: "← होम पर वापस जाएँ",
    heading: "हर चीज़ को",
    headingSecond: "बेहतर समझें।",
    sideDescription: "हर खेत के लिए जानकारी। हर निर्णय के लिए सही समझ।",
    footer: "आसमान से बीज तक, समस्याओं का समाधान",
    workspace: "आपका DHARA-AI वर्कस्पेस",
    title: "वापसी पर स्वागत है।",
    subtitle: "अपने फार्म वर्कस्पेस में आगे बढ़ने के लिए साइन इन करें।",
    createAccount: "अकाउंट बनाएँ",
    signIn: "साइन इन",
    email: "ईमेल पता",
    emailPlaceholder: "you@example.com",
    password: "पासवर्ड",
    passwordPlaceholder: "अपना पासवर्ड दर्ज करें",
    secureAccess: "आपके वर्कस्पेस के लिए सुरक्षित प्रवेश",
    forgotPassword: "पासवर्ड भूल गए?",
    pleaseWait: "कृपया प्रतीक्षा करें...",
    signInButton: "DHARA-AI में साइन इन करें",
    legal: "आगे बढ़कर, आप DHARA-AI का जिम्मेदारी से उपयोग करने के लिए सहमत हैं। आपके खेत की जानकारी आपके अकाउंट के माध्यम से संभाली जाएगी।",
    passwordError: "पासवर्ड में कम से कम 8 अक्षर होने चाहिए।",
    invalidCredentials: "ईमेल या पासवर्ड गलत है।",
    incompleteResponse: "सर्वर से अधूरी जानकारी प्राप्त हुई।",
    serverError: "DHARA-AI सर्वर से कनेक्ट नहीं हो पा रहा है। कृपया बैकएंड जाँचें।",
    recoveryError: "पासवर्ड रिकवरी अभी उपलब्ध नहीं है। कृपया एडमिनिस्ट्रेटर से संपर्क करें।",
    language: "भाषा",
  },

  mr: {
    backHome: "← मुख्यपृष्ठावर परत जा",
    heading: "प्रत्येक गोष्ट",
    headingSecond: "अधिक चांगल्या प्रकारे समजून घ्या.",
    sideDescription: "प्रत्येक शेतासाठी माहिती. प्रत्येक निर्णयासाठी योग्य मार्गदर्शन.",
    footer: "आकाशापासून बियाण्यापर्यंत, समस्यांचे समाधान",
    workspace: "तुमचे DHARA-AI वर्कस्पेस",
    title: "पुन्हा स्वागत आहे.",
    subtitle: "तुमच्या फार्म वर्कस्पेसमध्ये पुढे जाण्यासाठी साइन इन करा.",
    createAccount: "खाते तयार करा",
    signIn: "साइन इन",
    email: "ईमेल पत्ता",
    emailPlaceholder: "you@example.com",
    password: "पासवर्ड",
    passwordPlaceholder: "तुमचा पासवर्ड टाका",
    secureAccess: "तुमच्या वर्कस्पेससाठी सुरक्षित प्रवेश",
    forgotPassword: "पासवर्ड विसरलात?",
    pleaseWait: "कृपया प्रतीक्षा करा...",
    signInButton: "DHARA-AI मध्ये साइन इन करा",
    legal: "पुढे सुरू ठेवून, तुम्ही DHARA-AI चा जबाबदारीने वापर करण्यास सहमती देता. तुमच्या शेतीची माहिती तुमच्या खात्यामार्फत हाताळली जाईल.",
    passwordError: "पासवर्डमध्ये किमान 8 अक्षरे असणे आवश्यक आहे.",
    invalidCredentials: "ईमेल किंवा पासवर्ड चुकीचा आहे.",
    incompleteResponse: "सर्व्हरकडून अपूर्ण प्रतिसाद मिळाला.",
    serverError: "DHARA-AI सर्व्हरशी जोडता येत नाही. कृपया बॅकएंड तपासा.",
    recoveryError: "पासवर्ड रिकव्हरी सध्या उपलब्ध नाही. कृपया प्रशासकाशी संपर्क साधा.",
    language: "भाषा",
  },
};

function SignIn({ onAuthenticated }) {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();

  const t = signinTranslations[language] || signinTranslations.en;

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const formData = new FormData(event.currentTarget);

    const email = String(formData.get("email") || "")
      .trim()
      .toLowerCase();

    const password = String(formData.get("password") || "");

    if (password.length < 8) {
      setMessage(t.passwordError);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "https://dhara-ai-backend-l5lo.onrender.com/api/auth"}/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(data.message || t.invalidCredentials);
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
              htmlFor="signin-language"
              style={{ fontSize: "13px", color: "inherit" }}
            >
              {t.language}
            </label>

            <select
              id="signin-language"
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
            <Link to="/signup">
              {t.createAccount}
            </Link>

            <Link to="/signin" className="active">
              {t.signIn}
            </Link>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
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
                placeholder={t.passwordPlaceholder}
                minLength="8"
                autoComplete="current-password"
                required
              />
            </label>

            <div className="forgot-row">
              <span>{t.secureAccess}</span>

              <button
                type="button"
                onClick={() => setMessage(t.recoveryError)}
              >
                {t.forgotPassword}
              </button>
            </div>

            <button
              type="submit"
              className="dark-button auth-submit"
              disabled={loading}
            >
              {loading ? t.pleaseWait : t.signInButton}

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

export default SignIn;
