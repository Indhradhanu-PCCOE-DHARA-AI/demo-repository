
import { createContext, useContext, useState } from "react";

const translations = {
  en: {
    languageName: "English",
    dashboard: "Dashboard",
    overview: "Overview",
    satelliteHealth: "Satellite Field Health",
    cropAnalysis: "Crop Image Analysis",
    aiDiagnosis: "AI Diagnosis",
    analytics: "Analytics & Recommendations",
    temporalAnalysis: "Temporal Analysis",
    collectedData: "Collected Data",
    settings: "Settings",
    logout: "Logout",
    welcome: "Welcome",
    farmer: "Farmer",
    field: "Field",
    location: "Location",
    save: "Save",
    cancel: "Cancel",
    loading: "Loading...",
    noData: "No data available",
    selectLanguage: "Select Language",
    mainWorkspace: "MAIN WORKSPACE",
    insights: "INSIGHTS",
    management: "MANAGEMENT",
    workspace: "Farm workspace",
    workspaceReady: "Workspace ready",
    syncing: "Syncing...",
    refresh: "Refresh",
    yourFarm: "Your Farm",

    heroKicker: "YOUR FARM, YOUR INTELLIGENCE",
    heroTitle: "Growing smarter,",
    heroSubtitle: "one field at a time.",
    heroGreeting: "Hello",
    heroDescription: "Your farm's next chapter starts with understanding what's happening on the ground and from the sky.",
    exploreSatellite: "Explore satellite health",
    quickLook: "A QUICK LOOK AT YOUR FARM",
    farmAtGlance: "Your farm at a glance",
    profileConnected: "PROFILE CONNECTED",
    registeredFields: "REGISTERED FIELDS",
    totalFarmArea: "TOTAL FARM AREA",
    locationsMapped: "LOCATIONS MAPPED",
    fieldsInProfile: "Fields in your farm profile",
    registeredAreaUnit: "In your registered area unit",
    savedLocations: "Saved farm locations",
    skyToSoil: "FROM THE SKY TO YOUR SOIL",
    farmIntelligence: "Your farm intelligence",
    intelligenceDescription: "Explore the tools that will help you understand your crop, detect problems and make better farming decisions.",
    yourWorkspace: "YOUR WORKSPACE",
    fromSky: "FROM THE SKY",
    fromField: "FROM YOUR FIELD",
    intelligence: "INTELLIGENCE",
    learnImprove: "LEARN & IMPROVE",
    uploadCropPhotos: "Upload photographs of crop regions that need closer attention.",
    sentinelDescription: "Explore your field through Sentinel-2 imagery and vegetation indices.",
    diagnosisDescription: "Understand crop symptoms, possible diseases and suggested actions.",
    analyticsDescription: "Review previous findings, trends and AI-generated recommendations.",
    exploreImageAnalysis: "Explore image analysis",
    exploreDiagnosis: "Explore AI diagnosis",
    exploreAnalytics: "Explore analytics",
    registeredCrops: "YOUR REGISTERED CROPS",
    growingOnFarm: "Growing on your farm",
    viewAll: "View all",
    noCropInfo: "No crop information registered yet.",
    thenNow: "THEN & NOW",
    temporalTitle: "Watch your farm change over time.",
    temporalDescription: "Compare available satellite observations to understand vegetation changes.",
    exploreTemporal: "Explore temporal analysis",
    sensorConnection: "Ground sensor connection",
    sensorDescription: "Arduino sensor readings will appear here once the live hardware data pipeline is integrated.",
    sensorSetup: "Sensor setup",
    areaUnits: "area units",
    lastSynced: "Last synced",
  },

  hi: {
    languageName: "हिंदी",
    dashboard: "डैशबोर्ड",
    overview: "अवलोकन",
    satelliteHealth: "सैटेलाइट खेत स्वास्थ्य",
    cropAnalysis: "फसल फोटो विश्लेषण",
    aiDiagnosis: "AI फसल निदान",
    analytics: "विश्लेषण और सुझाव",
    temporalAnalysis: "समय-आधारित विश्लेषण",
    collectedData: "एकत्रित डेटा",
    settings: "सेटिंग्स",
    logout: "लॉग आउट",
    welcome: "स्वागत है",
    farmer: "किसान",
    field: "खेत",
    location: "स्थान",
    save: "सहेजें",
    cancel: "रद्द करें",
    loading: "लोड हो रहा है...",
    noData: "कोई डेटा उपलब्ध नहीं है",
    selectLanguage: "भाषा चुनें",
    mainWorkspace: "मुख्य कार्यक्षेत्र",
    insights: "जानकारी और सुझाव",
    management: "प्रबंधन",
    workspace: "किसान कार्यक्षेत्र",
    workspaceReady: "कार्यस्थल तैयार है",
    syncing: "डेटा सिंक हो रहा है...",
    refresh: "रिफ्रेश करें",
    yourFarm: "आपका खेत",

    heroKicker: "आपका खेत, आपकी जानकारी",
    heroTitle: "बेहतर खेती की ओर,",
    heroSubtitle: "हर खेत के साथ एक कदम आगे।",
    heroGreeting: "नमस्ते",
    heroDescription: "अपने खेत और फसल की स्थिति को जमीन और सैटेलाइट से समझकर खेती के बेहतर फैसले लें।",
    exploreSatellite: "सैटेलाइट से खेत देखें",
    quickLook: "आपके खेत की एक झलक",
    farmAtGlance: "आपके खेत की जानकारी",
    profileConnected: "प्रोफाइल जुड़ी हुई है",
    registeredFields: "पंजीकृत खेत",
    totalFarmArea: "कुल खेत का क्षेत्रफल",
    locationsMapped: "दर्ज स्थान",
    fieldsInProfile: "आपकी प्रोफाइल में दर्ज खेत",
    registeredAreaUnit: "आपकी दर्ज क्षेत्रफल इकाई में",
    savedLocations: "सहेजे गए खेत के स्थान",
    skyToSoil: "आसमान से आपकी मिट्टी तक",
    farmIntelligence: "आपके खेत की जानकारी",
    intelligenceDescription: "इन सुविधाओं से अपनी फसल को समझें, समस्याओं का पता लगाएं और बेहतर खेती के फैसले लें।",
    yourWorkspace: "आपका कार्यक्षेत्र",
    fromSky: "सैटेलाइट से",
    fromField: "आपके खेत से",
    intelligence: "बुद्धिमान विश्लेषण",
    learnImprove: "सीखें और सुधारें",
    uploadCropPhotos: "फसल के उन हिस्सों की तस्वीरें अपलोड करें जिनकी जांच जरूरी है।",
    sentinelDescription: "Sentinel-2 तस्वीरों और वनस्पति सूचकांकों से अपने खेत की स्थिति देखें।",
    diagnosisDescription: "फसल के लक्षण, संभावित रोग और जरूरी कदम समझें।",
    analyticsDescription: "पिछले निष्कर्ष, बदलाव और AI सुझाव देखें।",
    exploreImageAnalysis: "फसल तस्वीर जांचें",
    exploreDiagnosis: "फसल का निदान करें",
    exploreAnalytics: "विश्लेषण देखें",
    registeredCrops: "आपकी दर्ज फसलें",
    growingOnFarm: "आपके खेत में उगाई जा रही फसलें",
    viewAll: "सभी देखें",
    noCropInfo: "अभी तक फसल की जानकारी दर्ज नहीं की गई है।",
    thenNow: "पहले और अब",
    temporalTitle: "समय के साथ अपने खेत में बदलाव देखें।",
    temporalDescription: "सैटेलाइट की उपलब्ध तस्वीरों की तुलना करके फसल की स्थिति में बदलाव समझें।",
    exploreTemporal: "समय के अनुसार विश्लेषण देखें",
    sensorConnection: "खेत के सेंसर का कनेक्शन",
    sensorDescription: "लाइव हार्डवेयर डेटा कनेक्शन जुड़ने के बाद Arduino सेंसर की रीडिंग यहां दिखाई देंगी।",
    sensorSetup: "सेंसर सेटअप",
    areaUnits: "क्षेत्रफल इकाई",
    lastSynced: "अंतिम सिंक",
  },

  mr: {
    languageName: "मराठी",
    dashboard: "डॅशबोर्ड",
    overview: "आढावा",
    satelliteHealth: "उपग्रहाद्वारे शेताचे आरोग्य",
    cropAnalysis: "पीक छायाचित्र विश्लेषण",
    aiDiagnosis: "AI पीक निदान",
    analytics: "विश्लेषण आणि शिफारसी",
    temporalAnalysis: "कालावधीनुसार विश्लेषण",
    collectedData: "संकलित माहिती",
    settings: "सेटिंग्ज",
    logout: "लॉग आउट",
    welcome: "स्वागत आहे",
    farmer: "शेतकरी",
    field: "शेत",
    location: "स्थान",
    save: "जतन करा",
    cancel: "रद्द करा",
    loading: "लोड होत आहे...",
    noData: "माहिती उपलब्ध नाही",
    selectLanguage: "भाषा निवडा",
    mainWorkspace: "मुख्य कार्यक्षेत्र",
    insights: "माहिती आणि शिफारसी",
    management: "व्यवस्थापन",
    workspace: "शेतकरी कार्यक्षेत्र",
    workspaceReady: "कार्यस्थळ तयार आहे",
    syncing: "माहिती सिंक होत आहे...",
    refresh: "रिफ्रेश करा",
    yourFarm: "तुमचे शेत",

    heroKicker: "तुमचे शेत, तुमची माहिती",
    heroTitle: "अधिक स्मार्ट शेती,",
    heroSubtitle: "प्रत्येक शेतासोबत एक पाऊल पुढे.",
    heroGreeting: "नमस्कार",
    heroDescription: "जमिनीवरील आणि उपग्रहाद्वारे मिळणारी माहिती समजून तुमच्या शेतीसाठी चांगले निर्णय घ्या.",
    exploreSatellite: "उपग्रहाद्वारे शेत पाहा",
    quickLook: "तुमच्या शेताची एक झलक",
    farmAtGlance: "तुमच्या शेताची माहिती",
    profileConnected: "प्रोफाइल जोडलेले आहे",
    registeredFields: "नोंदणीकृत शेत",
    totalFarmArea: "एकूण शेताचे क्षेत्रफळ",
    locationsMapped: "नोंदवलेली ठिकाणे",
    fieldsInProfile: "तुमच्या प्रोफाइलमधील नोंदणीकृत शेत",
    registeredAreaUnit: "नोंदवलेल्या क्षेत्रफळाच्या एककात",
    savedLocations: "जतन केलेली शेताची ठिकाणे",
    skyToSoil: "आकाशापासून तुमच्या मातीपर्यंत",
    farmIntelligence: "तुमच्या शेतीची माहिती",
    intelligenceDescription: "या सुविधांद्वारे पीक समजून घ्या, समस्या ओळखा आणि शेतीसाठी चांगले निर्णय घ्या.",
    yourWorkspace: "तुमचे कार्यक्षेत्र",
    fromSky: "उपग्रहाद्वारे",
    fromField: "तुमच्या शेतातून",
    intelligence: "बुद्धिमान विश्लेषण",
    learnImprove: "शिका आणि सुधारणा करा",
    uploadCropPhotos: "अधिक तपासणी आवश्यक असलेल्या पिकांच्या भागांचे फोटो अपलोड करा.",
    sentinelDescription: "Sentinel-2 प्रतिमा आणि वनस्पती निर्देशांक वापरून तुमच्या शेताची स्थिती पाहा.",
    diagnosisDescription: "पिकांची लक्षणे, संभाव्य रोग आणि आवश्यक उपाय समजून घ्या.",
    analyticsDescription: "मागील निष्कर्ष, बदल आणि AI शिफारसी पाहा.",
    exploreImageAnalysis: "पीक छायाचित्र तपासा",
    exploreDiagnosis: "पीक निदान पाहा",
    exploreAnalytics: "विश्लेषण पाहा",
    registeredCrops: "तुमची नोंदणीकृत पिके",
    growingOnFarm: "तुमच्या शेतात घेतली जाणारी पिके",
    viewAll: "सर्व पाहा",
    noCropInfo: "अद्याप पिकांची माहिती नोंदवलेली नाही.",
    thenNow: "तेव्हा आणि आता",
    temporalTitle: "कालांतराने तुमच्या शेतातील बदल पाहा.",
    temporalDescription: "उपलब्ध उपग्रह प्रतिमांची तुलना करून पिकांच्या स्थितीतील बदल समजून घ्या.",
    exploreTemporal: "कालावधीनुसार विश्लेषण पाहा",
    sensorConnection: "शेतातील सेन्सर जोडणी",
    sensorDescription: "लाइव्ह हार्डवेअर डेटा जोडणी झाल्यानंतर Arduino सेन्सरची माहिती येथे दिसेल.",
    sensorSetup: "सेन्सर सेटअप",
    areaUnits: "क्षेत्रफळाचे एकक",
    lastSynced: "शेवटचे सिंक",
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("dhara_language");
    return ["en", "hi", "mr"].includes(savedLanguage)
      ? savedLanguage
      : "en";
  });

  const changeLanguage = (newLanguage) => {
    if (!translations[newLanguage]) return;

    setLanguage(newLanguage);
    localStorage.setItem("dhara_language", newLanguage);
  };

  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: changeLanguage, t, translations }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
