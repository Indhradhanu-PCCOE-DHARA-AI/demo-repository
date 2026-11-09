
import Logo from "../components/Logo";
import { useLanguage } from "../context/LanguageContext";

const landingTranslations = {
  en: {
    platform: "Platform",
    intelligence: "Intelligence",
    about: "About",
    signIn: "Sign in",
    getStarted: "Get started",
    eyebrow: "A NEW PERSPECTIVE ON AGRICULTURE",
    hero1: "See the land",
    hero2: "differently.",
    hero3: "Grow",
    hero4: "smarter.",
    heroDescription:
      "From satellite intelligence to on-ground insights, bring every part of your farm into one thoughtful workspace.",
    explore: "Explore DHARA-AI",
    discover: "Discover the platform",
    heroFootnote: "INTELLIGENCE THAT STARTS WITH YOUR LAND",
    fieldObservation: "FIELD OBSERVATION / 01",
    landIntelligence: "LAND INTELLIGENCE",
    fieldStory: "Every field has a story.",
    connectedWorkspace: "ONE CONNECTED AGRICULTURE WORKSPACE",
    satelliteData: "SATELLITE DATA",
    fieldMonitoring: "FIELD MONITORING",
    cropIntelligence: "CROP INTELLIGENCE",
    dataDecisions: "DATA-DRIVEN DECISIONS",
    platformKicker: "01 / THE PLATFORM",
    introHeading: "From raw imagery to",
    introHeadingSecond: "actionable intelligence.",
    introDescription:
      "Farming is full of signals. The challenge is knowing what they mean. DHARA-AI brings satellite observations, field information and sensor insights together to help you understand what is happening on your land.",
    approach: "Explore our approach",
    featureKicker: "02 / WHAT YOU CAN DO",
    featureHeading: "Better signals.",
    featureHeadingSecond: "Better decisions.",
    featureDescription: "One platform. Multiple perspectives. A clearer picture of your farm.",
    satelliteTitle: "Satellite",
    satelliteTitleSecond: "intelligence",
    satelliteDescription: "Explore vegetation patterns and observe changes across your fields.",
    fieldTitle: "Connected",
    fieldTitleSecond: "field insights",
    fieldDescription: "Bring farm boundaries, field details and ground observations together.",
    cropTitle: "Crop health",
    cropTitleSecond: "analysis",
    cropDescription: "Investigate crop images and understand possible plant health concerns.",
    analyticsTitle: "Farm",
    analyticsTitleSecond: "analytics",
    analyticsDescription: "Review historical observations and track your farm over time.",
    closingKicker: "THE NEXT CHAPTER OF FARMING",
    closingHeading: "Your land has potential.",
    closingHeadingSecond: "Let's understand it.",
    closingDescription: "Start building a clearer picture of your farm with DHARA-AI.",
    closingButton: "Get started with DHARA-AI",
    backToTop: "BACK TO TOP ↑",
    footer: "© 2026 DHARA-AI. SOLVING PROBLEMS FROM SKY TO SEED.",
    language: "Language",
  },

  hi: {
    platform: "प्लेटफ़ॉर्म",
    intelligence: "कृषि जानकारी",
    about: "हमारे बारे में",
    signIn: "साइन इन",
    getStarted: "शुरू करें",
    eyebrow: "कृषि को देखने का एक नया नज़रिया",
    hero1: "अपनी ज़मीन को",
    hero2: "एक नए नज़रिए से देखें।",
    hero3: "बेहतर",
    hero4: "खेती करें।",
    heroDescription:
      "सैटेलाइट से मिलने वाली जानकारी और खेत से प्राप्त जानकारियों को एक ही डिजिटल प्लेटफ़ॉर्म पर पाएँ।",
    explore: "DHARA-AI देखें",
    discover: "प्लेटफ़ॉर्म के बारे में जानें",
    heroFootnote: "आपकी ज़मीन से शुरू होती है सही जानकारी",
    fieldObservation: "खेत का निरीक्षण / 01",
    landIntelligence: "ज़मीन की जानकारी",
    fieldStory: "हर खेत की अपनी एक कहानी है।",
    connectedWorkspace: "एक संपूर्ण कृषि प्लेटफ़ॉर्म",
    satelliteData: "सैटेलाइट डेटा",
    fieldMonitoring: "खेत की निगरानी",
    cropIntelligence: "फसल की जानकारी",
    dataDecisions: "डेटा पर आधारित निर्णय",
    platformKicker: "01 / हमारा प्लेटफ़ॉर्म",
    introHeading: "सैटेलाइट तस्वीरों से",
    introHeadingSecond: "उपयोगी जानकारी तक।",
    introDescription:
      "खेती में कई संकेत मिलते हैं, लेकिन उन्हें समझना ज़रूरी है। DHARA-AI सैटेलाइट जानकारी, खेत का विवरण और सेंसर से मिलने वाले डेटा को एक साथ लाता है, ताकि आप अपनी ज़मीन की स्थिति बेहतर समझ सकें।",
    approach: "हमारे तरीके को जानें",
    featureKicker: "02 / आप क्या कर सकते हैं",
    featureHeading: "बेहतर जानकारी।",
    featureHeadingSecond: "बेहतर निर्णय।",
    featureDescription: "एक प्लेटफ़ॉर्म। कई नज़रिए। आपके खेत की बेहतर समझ।",
    satelliteTitle: "सैटेलाइट",
    satelliteTitleSecond: "जानकारी",
    satelliteDescription: "फसलों की हरियाली के पैटर्न देखें और खेतों में होने वाले बदलाव समझें।",
    fieldTitle: "जुड़ी हुई",
    fieldTitleSecond: "खेत की जानकारी",
    fieldDescription: "खेत की सीमाएँ, विवरण और ज़मीन से मिलने वाली जानकारी एक साथ पाएँ।",
    cropTitle: "फसल की सेहत",
    cropTitleSecond: "का विश्लेषण",
    cropDescription: "फसल की तस्वीरों का विश्लेषण करें और पौधों की संभावित समस्याएँ समझें।",
    analyticsTitle: "खेती का",
    analyticsTitleSecond: "विश्लेषण",
    analyticsDescription: "पुरानी जानकारियों की समीक्षा करें और समय के साथ खेत में होने वाले बदलाव देखें।",
    closingKicker: "खेती का एक नया अध्याय",
    closingHeading: "आपकी ज़मीन में बहुत क्षमता है।",
    closingHeadingSecond: "आइए, इसे समझें।",
    closingDescription: "DHARA-AI के साथ अपने खेत की बेहतर जानकारी प्राप्त करना शुरू करें।",
    closingButton: "DHARA-AI के साथ शुरू करें",
    backToTop: "ऊपर जाएँ ↑",
    footer: "© 2026 DHARA-AI. आसमान से बीज तक, समस्याओं का समाधान।",
    language: "भाषा",
  },

  mr: {
    platform: "प्लॅटफॉर्म",
    intelligence: "शेतीविषयक माहिती",
    about: "आमच्याबद्दल",
    signIn: "साइन इन",
    getStarted: "सुरुवात करा",
    eyebrow: "शेतीकडे पाहण्याचा एक नवीन दृष्टिकोन",
    hero1: "तुमच्या जमिनीकडे",
    hero2: "नव्या दृष्टिकोनातून पाहा.",
    hero3: "अधिक चांगली",
    hero4: "शेती करा.",
    heroDescription:
      "उपग्रहाद्वारे मिळणारी माहिती आणि शेतातील निरीक्षणे एका डिजिटल प्लॅटफॉर्मवर मिळवा.",
    explore: "DHARA-AI एक्सप्लोर करा",
    discover: "प्लॅटफॉर्म जाणून घ्या",
    heroFootnote: "तुमच्या जमिनीपासून सुरू होणारी माहिती",
    fieldObservation: "शेताचे निरीक्षण / 01",
    landIntelligence: "जमिनीची माहिती",
    fieldStory: "प्रत्येक शेताची एक वेगळी कहाणी असते.",
    connectedWorkspace: "एकात्मिक शेती प्लॅटफॉर्म",
    satelliteData: "उपग्रह माहिती",
    fieldMonitoring: "शेताचे निरीक्षण",
    cropIntelligence: "पिकांची माहिती",
    dataDecisions: "माहितीवर आधारित निर्णय",
    platformKicker: "01 / आमचा प्लॅटफॉर्म",
    introHeading: "उपग्रह प्रतिमांपासून",
    introHeadingSecond: "उपयुक्त माहितीपर्यंत.",
    introDescription:
      "शेतीमध्ये अनेक संकेत मिळतात; मात्र त्यांचा अर्थ समजून घेणे महत्त्वाचे आहे. DHARA-AI उपग्रह निरीक्षणे, शेताची माहिती आणि सेन्सरद्वारे मिळणारी माहिती एकत्र आणते, ज्यामुळे तुम्हाला तुमच्या जमिनीची स्थिती समजण्यास मदत होते.",
    approach: "आमची कार्यपद्धती जाणून घ्या",
    featureKicker: "02 / तुम्ही काय करू शकता",
    featureHeading: "अधिक चांगली माहिती.",
    featureHeadingSecond: "अधिक चांगले निर्णय.",
    featureDescription: "एक प्लॅटफॉर्म. अनेक दृष्टिकोन. तुमच्या शेतीची अधिक चांगली समज.",
    satelliteTitle: "उपग्रह",
    satelliteTitleSecond: "माहिती",
    satelliteDescription: "पिकांच्या हिरवळीचे नमुने पाहा आणि शेतातील बदल समजून घ्या.",
    fieldTitle: "एकत्रित",
    fieldTitleSecond: "शेताची माहिती",
    fieldDescription: "शेताच्या सीमा, तपशील आणि जमिनीवरील निरीक्षणे एकत्र मिळवा.",
    cropTitle: "पिकांच्या आरोग्याचे",
    cropTitleSecond: "विश्लेषण",
    cropDescription: "पिकांच्या प्रतिमांचे विश्लेषण करा आणि संभाव्य समस्या समजून घ्या.",
    analyticsTitle: "शेतीचे",
    analyticsTitleSecond: "विश्लेषण",
    analyticsDescription: "पूर्वीच्या निरीक्षणांचा आढावा घ्या आणि कालांतराने होणारे बदल पाहा.",
    closingKicker: "शेतीचे एक नवीन पर्व",
    closingHeading: "तुमच्या जमिनीत मोठी क्षमता आहे.",
    closingHeadingSecond: "चला, ती समजून घेऊया.",
    closingDescription: "DHARA-AI सोबत तुमच्या शेतीची अधिक चांगली माहिती मिळवण्यास सुरुवात करा.",
    closingButton: "DHARA-AI सोबत सुरुवात करा",
    backToTop: "वर जा ↑",
    footer: "© 2026 DHARA-AI. आकाशापासून बियाण्यापर्यंत, समस्यांचे समाधान.",
    language: "भाषा",
  },
};

function Landing({ onAuth }) {
  const { language, setLanguage } = useLanguage();

  const t = landingTranslations[language] || landingTranslations.en;

  return (
    <main className="landing">
      <header className="site-header">
        <a href="#home" className="header-logo">
          <Logo small />
        </a>

        <nav className="main-nav">
          <a href="#platform">{t.platform}</a>
          <a href="#intelligence">{t.intelligence}</a>
          <a href="#about">{t.about}</a>
        </nav>

        <div className="header-actions">
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            aria-label={t.language}
            style={{
              padding: "9px 10px",
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
            className="text-button"
            onClick={() => onAuth("signin")}
          >
            {t.signIn}
          </button>

          <button
            className="dark-button header-cta"
            onClick={() => onAuth("signup")}
          >
            {t.getStarted} <span>↗</span>
          </button>
        </div>
      </header>

      <section className="hero-section" id="home">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            {t.eyebrow}
          </div>

          <h1>
            {t.hero1}
            <br />
            {t.hero2} <em>{t.hero3}</em>
            <br />
            <em>{t.hero4}</em>
          </h1>

          <p className="hero-description">
            {t.heroDescription}
          </p>

          <div className="hero-actions">
            <button
              className="dark-button"
              onClick={() => onAuth("signup")}
            >
              {t.explore} <span>↗</span>
            </button>

            <a href="#platform" className="learn-link">
              {t.discover} <span>↓</span>
            </a>
          </div>

          <div className="hero-footnote">
            <span className="online-dot" />
            {t.heroFootnote}
          </div>
        </div>

        <div className="hero-visual">
          <div
            className="hero-image"
            role="img"
            aria-label="Aerial view of agricultural fields"
          />

          <div className="image-coordinate">
            <span>{t.fieldObservation}</span>
            <strong>18°31' N · 73°51' E</strong>
          </div>

          <div className="floating-insight">
            <span className="insight-icon">✳</span>
            <div>
              <small>{t.landIntelligence}</small>
              <strong>{t.fieldStory}</strong>
            </div>
          </div>

          <div className="image-index">01 — 04</div>
        </div>
      </section>

      <section className="trust-strip">
        <span>{t.connectedWorkspace}</span>
        <div><i /> {t.satelliteData}</div>
        <div><i /> {t.fieldMonitoring}</div>
        <div><i /> {t.cropIntelligence}</div>
        <div><i /> {t.dataDecisions}</div>
      </section>

      <section className="intro-section section-pad" id="platform">
        <div className="section-kicker">
          {t.platformKicker}
        </div>

        <div className="intro-grid">
          <h2>
            {t.introHeading}
            <br />
            <em>{t.introHeadingSecond}</em>
          </h2>

          <div className="intro-copy">
            <p>{t.introDescription}</p>

            <a href="#intelligence" className="underlined-link">
              {t.approach} <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="feature-section section-pad" id="intelligence">
        <div className="section-heading-row">
          <div>
            <div className="section-kicker">
              {t.featureKicker}
            </div>

            <h2>
              {t.featureHeading}
              <br />
              <em>{t.featureHeadingSecond}</em>
            </h2>
          </div>

          <p>
            {t.featureDescription}
          </p>
        </div>

        <div className="feature-grid">
          <article className="feature-card feature-dark">
            <div className="feature-number">01</div>
            <div className="feature-symbol">◉</div>
            <h3>{t.satelliteTitle}<br />{t.satelliteTitleSecond}</h3>
            <p>{t.satelliteDescription}</p>
            <span className="feature-arrow">↗</span>
          </article>

          <article className="feature-card feature-image-card">
            <div className="feature-number">02</div>
            <div className="feature-symbol">⌖</div>
            <h3>{t.fieldTitle}<br />{t.fieldTitleSecond}</h3>
            <p>{t.fieldDescription}</p>
            <span className="feature-arrow">↗</span>
          </article>

          <article className="feature-card feature-light">
            <div className="feature-number">03</div>
            <div className="feature-symbol">✳</div>
            <h3>{t.cropTitle}<br />{t.cropTitleSecond}</h3>
            <p>{t.cropDescription}</p>
            <span className="feature-arrow">↗</span>
          </article>

          <article className="feature-card feature-pale">
            <div className="feature-number">04</div>
            <div className="feature-symbol">⌁</div>
            <h3>{t.analyticsTitle}<br />{t.analyticsTitleSecond}</h3>
            <p>{t.analyticsDescription}</p>
            <span className="feature-arrow">↗</span>
          </article>
        </div>
      </section>

      <section className="closing-section" id="about">
        <div className="closing-mark">
          <img src="/dhara-logo-mark.png.jpeg.png" alt="" />
        </div>

        <div className="section-kicker">
          {t.closingKicker}
        </div>

        <h2>
          {t.closingHeading}
          <br />
          <em>{t.closingHeadingSecond}</em>
        </h2>

        <p>{t.closingDescription}</p>

        <button
          className="light-button"
          onClick={() => onAuth("signup")}
        >
          {t.closingButton} <span>↗</span>
        </button>

        <span className="closing-since">
          DHARA-AI · SINCE 2026
        </span>
      </section>

      <footer className="site-footer">
        <Logo small />
        <span>{t.footer}</span>
        <a href="#home">{t.backToTop}</a>
      </footer>
    </main>
  );
}

export default Landing;
