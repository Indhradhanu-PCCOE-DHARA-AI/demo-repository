
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import Logo from "../../components/Logo";

const onboardingTranslations = {
  en: {
    welcome: "Welcome",
    farmer: "Farmer",
    logout: "Log out",
    workspace: "YOUR DHARA-AI WORKSPACE / SETUP",
    heading: "Let's understand",
    headingSecond: "your land.",
    intro:
      "Before we begin analysing your farm, we need to understand a little about you, your fields and their location. Complete these three steps to set up your workspace.",
    journey: "YOUR SETUP JOURNEY",
    completed: "of 3 sections completed",
    farmerTitle: "Farmer Information",
    farmerDescription:
      "Tell us about yourself and your farming background.",
    farmerDetails: [
      "Personal details",
      "Contact information",
      "Farming experience",
    ],
    fieldTitle: "Field Information",
    fieldDescription:
      "Add details about your crops, fields and agricultural practices.",
    fieldDetails: [
      "Crop details",
      "Field area",
      "Soil information",
    ],
    locationTitle: "Location Data",
    locationDescription:
      "Share your farm location and define your field boundaries.",
    locationDetails: [
      "GPS location",
      "Map your farm",
      "Farm boundary",
    ],
    completedSuccessfully: "✓ Completed successfully",
    review: "Review information",
    getStarted: "Get started",
    note:
      "Your information helps DHARA-AI create a more meaningful picture of your farm. You can review your submitted details in your workspace.",
    footer: "© 2026 DHARA-AI · SOLVING PROBLEMS FROM SKY TO SEED",
    language: "Language",
  },

  hi: {
    welcome: "स्वागत है",
    farmer: "किसान",
    logout: "लॉग आउट",
    workspace: "आपका DHARA-AI वर्कस्पेस / सेटअप",
    heading: "आइए समझते हैं",
    headingSecond: "आपकी ज़मीन को।",
    intro:
      "आपके खेत का विश्लेषण शुरू करने से पहले, हमें आपके बारे में, आपके खेतों और उनके स्थान के बारे में कुछ जानकारी चाहिए। अपना वर्कस्पेस तैयार करने के लिए ये तीन चरण पूरे करें।",
    journey: "आपकी सेटअप यात्रा",
    completed: "में से 3 सेक्शन पूरे हुए",
    farmerTitle: "किसान की जानकारी",
    farmerDescription:
      "अपने और अपने खेती के अनुभव के बारे में बताएँ।",
    farmerDetails: [
      "व्यक्तिगत जानकारी",
      "संपर्क जानकारी",
      "खेती का अनुभव",
    ],
    fieldTitle: "खेत की जानकारी",
    fieldDescription:
      "अपनी फसलों, खेतों और खेती के तरीकों का विवरण जोड़ें।",
    fieldDetails: [
      "फसल का विवरण",
      "खेत का क्षेत्रफल",
      "मिट्टी की जानकारी",
    ],
    locationTitle: "स्थान की जानकारी",
    locationDescription:
      "अपने खेत का स्थान साझा करें और खेत की सीमाएँ निर्धारित करें।",
    locationDetails: [
      "GPS स्थान",
      "अपने खेत का नक्शा",
      "खेत की सीमाएँ",
    ],
    completedSuccessfully: "✓ सफलतापूर्वक पूरा हुआ",
    review: "जानकारी देखें",
    getStarted: "शुरू करें",
    note:
      "आपकी जानकारी DHARA-AI को आपके खेत की बेहतर समझ बनाने में मदद करती है। आप अपने वर्कस्पेस में जमा की गई जानकारी दोबारा देख सकते हैं।",
    footer: "© 2026 DHARA-AI · आसमान से बीज तक, समस्याओं का समाधान",
    language: "भाषा",
  },

  mr: {
    welcome: "स्वागत आहे",
    farmer: "शेतकरी",
    logout: "लॉग आउट",
    workspace: "तुमचे DHARA-AI वर्कस्पेस / सेटअप",
    heading: "चला समजून घेऊया",
    headingSecond: "तुमची जमीन.",
    intro:
      "तुमच्या शेतीचे विश्लेषण सुरू करण्यापूर्वी, आम्हाला तुमच्याबद्दल, तुमच्या शेतांबद्दल आणि त्यांच्या स्थानाबद्दल काही माहिती हवी आहे. तुमचे वर्कस्पेस तयार करण्यासाठी हे तीन टप्पे पूर्ण करा.",
    journey: "तुमचा सेटअप प्रवास",
    completed: "पैकी 3 विभाग पूर्ण",
    farmerTitle: "शेतकऱ्याची माहिती",
    farmerDescription:
      "तुमच्याबद्दल आणि तुमच्या शेतीच्या अनुभवाबद्दल सांगा.",
    farmerDetails: [
      "वैयक्तिक माहिती",
      "संपर्क माहिती",
      "शेतीचा अनुभव",
    ],
    fieldTitle: "शेताची माहिती",
    fieldDescription:
      "तुमची पिके, शेते आणि शेतीच्या पद्धतींची माहिती भरा.",
    fieldDetails: [
      "पिकांची माहिती",
      "शेताचे क्षेत्रफळ",
      "मातीची माहिती",
    ],
    locationTitle: "स्थानाची माहिती",
    locationDescription:
      "तुमच्या शेताचे स्थान शेअर करा आणि शेताच्या सीमा निश्चित करा.",
    locationDetails: [
      "GPS स्थान",
      "तुमच्या शेताचा नकाशा",
      "शेताच्या सीमा",
    ],
    completedSuccessfully: "✓ यशस्वीरित्या पूर्ण झाले",
    review: "माहिती तपासा",
    getStarted: "सुरुवात करा",
    note:
      "तुमची माहिती DHARA-AI ला तुमच्या शेतीचे अधिक चांगले चित्र तयार करण्यास मदत करते. तुम्ही तुमच्या वर्कस्पेसमध्ये भरलेली माहिती पुन्हा पाहू शकता.",
    footer: "© 2026 DHARA-AI · आकाशापासून बियाण्यापर्यंत, समस्यांचे समाधान",
    language: "भाषा",
  },
};

function OnboardingHub({ user, onLogout }) {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();

  const t =
    onboardingTranslations[language] || onboardingTranslations.en;

  const [completion, setCompletion] = useState({
    farmer: false,
    field: false,
    location: false,
  });

  useEffect(() => {
    setCompletion({
      farmer:
        localStorage.getItem("dhara_farmer_completed") === "true",
      field:
        localStorage.getItem("dhara_field_completed") === "true",
      location:
        localStorage.getItem("dhara_location_completed") === "true",
    });
  }, []);

  const sections = [
    {
      number: "01",
      icon: "♧",
      title: t.farmerTitle,
      description: t.farmerDescription,
      details: t.farmerDetails,
      path: "/onboarding/farmer",
      completed: completion.farmer,
    },
    {
      number: "02",
      icon: "▤",
      title: t.fieldTitle,
      description: t.fieldDescription,
      details: t.fieldDetails,
      path: "/onboarding/field",
      completed: completion.field,
    },
    {
      number: "03",
      icon: "⌖",
      title: t.locationTitle,
      description: t.locationDescription,
      details: t.locationDetails,
      path: "/onboarding/location",
      completed: completion.location,
    },
  ];

  const completedCount = sections.filter(
    (section) => section.completed
  ).length;

  const progressPercentage = (completedCount / 3) * 100;

  return (
    <main className="onboarding-page">
      <header className="onboarding-header">
        <Logo small />

        <div className="onboarding-header-actions">
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

          <span>
            {t.welcome}, {user?.name || t.farmer}
          </span>

          <button onClick={onLogout}>
            {t.logout} ↗
          </button>
        </div>
      </header>

      <section className="onboarding-content">
        <div className="onboarding-heading">
          <span className="section-kicker">
            {t.workspace}
          </span>

          <h1>
            {t.heading}
            <br />
            <em>{t.headingSecond}</em>
          </h1>

          <p>{t.intro}</p>
        </div>

        <div className="onboarding-progress">
          <div>
            <span>{t.journey}</span>
            <strong>
              {completedCount} {t.completed}
            </strong>
          </div>

          <div className="progress-track">
            <span
              style={{
                width: `${progressPercentage}%`,
                transition: "width 0.4s ease",
              }}
            />
          </div>
        </div>

        <div className="onboarding-grid">
          {sections.map((section) => (
            <article
              className="onboarding-card"
              key={section.number}
            >
              <div className="onboarding-card-top">
                <span>{section.number} / 03</span>

                <span className="onboarding-card-icon">
                  {section.icon}
                </span>
              </div>

              <h2>{section.title}</h2>

              <p>{section.description}</p>

              <ul>
                {section.details.map((detail) => (
                  <li key={detail}>
                    <span>✓</span> {detail}
                  </li>
                ))}
              </ul>

              {section.completed && (
                <p
                  role="status"
                  style={{
                    color: "#347747",
                    fontWeight: "600",
                  }}
                >
                  {t.completedSuccessfully}
                </p>
              )}

              <button
                onClick={() => navigate(section.path)}
                className="dark-button onboarding-card-button"
              >
                {section.completed ? t.review : t.getStarted}
                <span>↗</span>
              </button>
            </article>
          ))}
        </div>

        <div className="onboarding-note">
          <span>✳</span>
          <p>{t.note}</p>
        </div>
      </section>

      <footer className="onboarding-footer">
        <Logo small />
        <span>{t.footer}</span>
      </footer>
    </main>
  );
}

export default OnboardingHub;
