
import "./AIDiagnosis.css";
import { useLanguage } from "../../context/LanguageContext";

const translations = {
  en: {
    notAvailable: "Not available",
    notSpecified: "Not specified",
    heading: "AI Crop Diagnosis",
    eyebrow: "INTELLIGENCE / DISEASE DETECTION",
    headingDescription: "Understand the image-analysis result in the context of your registered farm information.",
    emptyLabel: "NO ANALYSIS AVAILABLE",
    emptyTitle: "Your diagnosis workspace is ready.",
    emptyDescription: "Upload a photograph of your crop in Crop Image Analysis. Once the AI model processes it, your prediction and field information will appear here.",
    step1: "Select a registered field",
    step2: "Upload a crop photograph",
    step3: "Run AI image analysis",
    modelIdentification: "MODEL IDENTIFICATION",
    healthy: "Healthy indication",
    uncertain: "Uncertain result",
    diseaseDetected: "Possible disease detected",
    healthyDescription: "The model did not identify a disease condition in the uploaded image.",
    uncertainDescription: "The model could not confidently identify the crop condition.",
    diseaseDescription: "The model identified a possible disease pattern. This result should be verified with field observations.",
    identifiedCrop: "IDENTIFIED CROP",
    cropDescription: "Crop selected or identified during image analysis",
    confidence: "MODEL CONFIDENCE",
    confidenceDescription: "Model confidence score, not a guarantee of diagnosis accuracy",
    plantPart: "PLANT PART",
    plantPartDescription: "Plant part selected during image upload",
    farmContext: "FARM CONTEXT",
    analysisInformation: "Analysis information",
    farmer: "Farmer",
    selectedField: "Selected field",
    registeredCrop: "Registered crop",
    cropVariety: "Crop variety",
    soilType: "Soil type",
    irrigation: "Irrigation",
    location: "Location",
    analysisTime: "Analysis time",
    actionPlan: "FIELD ACTION PLAN",
    nextSteps: "Suggested next steps",
    recommendationIntro: "General monitoring suggestions based on the model's predicted condition:",
    healthyRec1: "Continue routine field monitoring and maintain regular crop inspections.",
    healthyRec2: "Check soil moisture and irrigation conditions according to the crop's needs.",
    healthyRec3: "Keep a record of new symptoms or visible changes in the crop.",
    diseaseRec1: "Inspect nearby plants for similar leaf spots, lesions, discoloration or spreading symptoms.",
    diseaseRec2: "Avoid unnecessary overhead watering and check whether the crop canopy has adequate airflow.",
    diseaseRec3: "Photograph affected and unaffected plants separately to monitor how the symptoms develop.",
    diseaseRec4: "Consult a local agricultural expert or extension officer before selecting any treatment.",
    virusRec1: "Inspect leaves for curling, mosaic patterns, unusual discoloration and stunted growth.",
    virusRec2: "Check whether similar symptoms are appearing on nearby plants.",
    virusRec3: "Look for possible insect vectors such as aphids or whiteflies.",
    virusRec4: "Seek confirmation from an agricultural expert before taking control measures.",
    generalRec1: "Inspect the affected plant closely and compare it with healthy plants in the same field.",
    generalRec2: "Record visible symptoms, affected plant parts and how widely they are distributed.",
    generalRec3: "Monitor the affected area over the next few days and capture follow-up photographs.",
    generalRec4: "Consult an agricultural expert before applying any disease-control treatment.",
    modelOutput: "MODEL OUTPUT",
    alternatives: "Other prediction possibilities",
    disclaimerTitle: "AI-assisted assessment, not a confirmed diagnosis",
    disclaimer: "Image-based predictions can be affected by lighting, image quality, crop variety and similar-looking symptoms. Verify the result through field inspection and consult a qualified agricultural expert before making treatment decisions. Do not apply pesticides or other chemicals based only on this prediction.",
    scoreNote: "Model confidence score",
    unknown: "Unknown",
    leaf: "Leaf",
    stem: "Stem",
    fruit: "Fruit",
    root: "Root",
    wholePlant: "Whole plant",
    other: "Other",
    tomato: "Tomato",
    potato: "Potato",
    apple: "Apple",
    grape: "Grape",
    corn: "Corn",
    rice: "Rice",
    healthyDisease: "Healthy",
    lateBlight: "Late Blight",
    earlyBlight: "Early Blight",
    leafRust: "Leaf Rust",
    stemRust: "Stem Rust",
    commonRust: "Common Rust",
    powderyMildew: "Powdery Mildew",
    downyMildew: "Downy Mildew",
    bacterialLeafBlight: "Bacterial Leaf Blight",
    bacterialSpot: "Bacterial Spot",
    leafSpot: "Leaf Spot",
    septoriaLeafSpot: "Septoria Leaf Spot",
    targetSpot: "Target Spot",
    leafMold: "Leaf Mold",
    mosaicVirus: "Mosaic Virus",
    yellowLeafCurlVirus: "Yellow Leaf Curl Virus",
    appleScab: "Apple Scab",
    blackRot: "Black Rot",
    esca: "Esca",
    cedarAppleRust: "Cedar Apple Rust",
    cercospora: "Cercospora Leaf Spot",
    anthracnose: "Anthracnose",
    blackMeasles: "Black Measles",
    spiderMites: "Spider Mites",
    unknownDisease: "Unidentified Condition"
  },

  hi: {
    notAvailable: "उपलब्ध नहीं",
    notSpecified: "निर्दिष्ट नहीं",
    heading: "एआई फसल रोग निदान",
    eyebrow: "बुद्धिमत्ता / रोग की पहचान",
    headingDescription: "अपने खेत की पंजीकृत जानकारी के आधार पर फसल की तस्वीर के विश्लेषण को समझें।",
    emptyLabel: "कोई विश्लेषण उपलब्ध नहीं",
    emptyTitle: "आपका रोग निदान पृष्ठ तैयार है।",
    emptyDescription: "क्रॉप इमेज एनालिसिस में अपनी फसल की तस्वीर अपलोड करें। एआई मॉडल के विश्लेषण के बाद परिणाम और खेत की जानकारी यहाँ दिखाई देगी।",
    step1: "पंजीकृत खेत चुनें",
    step2: "फसल की तस्वीर अपलोड करें",
    step3: "एआई से तस्वीर का विश्लेषण करें",
    modelIdentification: "मॉडल द्वारा पहचान",
    healthy: "फसल स्वस्थ दिखाई दे रही है",
    uncertain: "अनिश्चित परिणाम",
    diseaseDetected: "संभावित रोग की पहचान",
    healthyDescription: "अपलोड की गई तस्वीर में मॉडल को किसी रोग के लक्षण नहीं मिले।",
    uncertainDescription: "मॉडल फसल की स्थिति की निश्चित पहचान नहीं कर सका।",
    diseaseDescription: "मॉडल ने संभावित रोग के लक्षण पहचाने हैं। खेत में निरीक्षण करके इस परिणाम की पुष्टि करें।",
    identifiedCrop: "पहचानी गई फसल",
    cropDescription: "विश्लेषण के दौरान चुनी गई या पहचानी गई फसल",
    confidence: "मॉडल का विश्वास स्तर",
    confidenceDescription: "यह मॉडल का विश्वास स्कोर है, निदान की सटीकता की गारंटी नहीं।",
    plantPart: "पौधे का भाग",
    plantPartDescription: "तस्वीर अपलोड करते समय चुना गया पौधे का भाग",
    farmContext: "खेत की जानकारी",
    analysisInformation: "विश्लेषण की जानकारी",
    farmer: "किसान",
    selectedField: "चुना गया खेत",
    registeredCrop: "पंजीकृत फसल",
    cropVariety: "फसल की किस्म",
    soilType: "मिट्टी का प्रकार",
    irrigation: "सिंचाई",
    location: "स्थान",
    analysisTime: "विश्लेषण का समय",
    actionPlan: "खेत के लिए सुझाव",
    nextSteps: "आगे क्या करें",
    recommendationIntro: "मॉडल द्वारा पहचानी गई स्थिति के आधार पर सामान्य सुझाव:",
    healthyRec1: "खेत की नियमित निगरानी करें और फसल का निरीक्षण करते रहें।",
    healthyRec2: "फसल की आवश्यकता के अनुसार मिट्टी की नमी और सिंचाई की जाँच करें।",
    healthyRec3: "फसल में दिखाई देने वाले नए लक्षणों या बदलावों का रिकॉर्ड रखें।",
    diseaseRec1: "आसपास के पौधों में भी पत्तियों पर धब्बे, घाव, रंग बदलने या फैलते हुए लक्षणों की जाँच करें।",
    diseaseRec2: "अनावश्यक रूप से ऊपर से पानी देने से बचें और पौधों के बीच हवा के आवागमन की जाँच करें।",
    diseaseRec3: "प्रभावित और स्वस्थ पौधों की अलग-अलग तस्वीरें लें ताकि लक्षणों में बदलाव देखा जा सके।",
    diseaseRec4: "किसी भी उपचार को चुनने से पहले स्थानीय कृषि विशेषज्ञ या कृषि अधिकारी से सलाह लें।",
    virusRec1: "पत्तियों के मुड़ने, मोज़ेक जैसे पैटर्न, असामान्य रंग और पौधों की धीमी वृद्धि की जाँच करें।",
    virusRec2: "देखें कि आसपास के पौधों में भी ऐसे लक्षण दिखाई दे रहे हैं या नहीं।",
    virusRec3: "एफिड्स या सफेद मक्खी जैसे संभावित कीटों की जाँच करें।",
    virusRec4: "रोग नियंत्रण के उपाय करने से पहले कृषि विशेषज्ञ से पुष्टि करवाएँ।",
    generalRec1: "प्रभावित पौधे का ध्यान से निरीक्षण करें और उसी खेत के स्वस्थ पौधों से तुलना करें।",
    generalRec2: "दिखाई देने वाले लक्षणों, प्रभावित पौधों के भागों और उनके फैलाव का रिकॉर्ड रखें।",
    generalRec3: "अगले कुछ दिनों तक प्रभावित क्षेत्र की निगरानी करें और नई तस्वीरें लें।",
    generalRec4: "रोग नियंत्रण के लिए कोई उपचार करने से पहले कृषि विशेषज्ञ से सलाह लें।",
    modelOutput: "मॉडल का परिणाम",
    alternatives: "अन्य संभावित परिणाम",
    disclaimerTitle: "एआई आधारित आकलन, अंतिम निदान नहीं",
    disclaimer: "तस्वीर के आधार पर मिलने वाले परिणाम रोशनी, तस्वीर की गुणवत्ता, फसल की किस्म और मिलते-जुलते लक्षणों से प्रभावित हो सकते हैं। उपचार का निर्णय लेने से पहले खेत में निरीक्षण करें और योग्य कृषि विशेषज्ञ से सलाह लें। केवल इस परिणाम के आधार पर कीटनाशक या अन्य रसायनों का उपयोग न करें।",
    scoreNote: "मॉडल का विश्वास स्कोर",
    unknown: "अज्ञात",
    leaf: "पत्ती",
    stem: "तना",
    fruit: "फल",
    root: "जड़",
    wholePlant: "पूरा पौधा",
    other: "अन्य",
    tomato: "टमाटर",
    potato: "आलू",
    apple: "सेब",
    grape: "अंगूर",
    corn: "मक्का",
    rice: "चावल",
    healthyDisease: "स्वस्थ",
    lateBlight: "पछेती झुलसा रोग",
    earlyBlight: "अगेती झुलसा रोग",
    leafRust: "पत्ती का रतुआ रोग",
    stemRust: "तने का रतुआ रोग",
    commonRust: "सामान्य रतुआ रोग",
    powderyMildew: "चूर्णिल आसिता रोग",
    downyMildew: "मृदुरोमिल आसिता रोग",
    bacterialLeafBlight: "जीवाणु जनित पत्ती झुलसा रोग",
    bacterialSpot: "जीवाणु जनित धब्बा रोग",
    leafSpot: "पत्ती धब्बा रोग",
    septoriaLeafSpot: "सेप्टोरिया पत्ती धब्बा रोग",
    targetSpot: "लक्ष्य धब्बा रोग",
    leafMold: "पत्ती फफूंद रोग",
    mosaicVirus: "मोज़ेक विषाणु रोग",
    yellowLeafCurlVirus: "पीला पत्ती मरोड़ विषाणु रोग",
    appleScab: "सेब का स्कैब रोग",
    blackRot: "काला सड़न रोग",
    esca: "एस्का रोग",
    cedarAppleRust: "देवदार-सेब रतुआ रोग",
    cercospora: "सर्कोस्पोरा पत्ती धब्बा रोग",
    anthracnose: "एन्थ्रेक्नोज रोग",
    blackMeasles: "काला खसरा रोग",
    spiderMites: "माइट का प्रकोप",
    unknownDisease: "अज्ञात फसल समस्या"
  },

  mr: {
    notAvailable: "उपलब्ध नाही",
    notSpecified: "नमूद केलेले नाही",
    heading: "एआय पीक रोग निदान",
    eyebrow: "बुद्धिमत्ता / रोग ओळख",
    headingDescription: "तुमच्या नोंदणीकृत शेतीच्या माहितीच्या आधारे पिकाच्या छायाचित्राच्या विश्लेषणाचा अर्थ समजून घ्या.",
    emptyLabel: "विश्लेषण उपलब्ध नाही",
    emptyTitle: "तुमचे रोग निदान पृष्ठ तयार आहे.",
    emptyDescription: "क्रॉप इमेज ॲनालिसिसमध्ये तुमच्या पिकाचा फोटो अपलोड करा. एआय मॉडेलने विश्लेषण केल्यानंतर अंदाज आणि शेताची माहिती येथे दिसेल.",
    step1: "नोंदणीकृत शेत निवडा",
    step2: "पिकाचा फोटो अपलोड करा",
    step3: "एआयद्वारे फोटोचे विश्लेषण करा",
    modelIdentification: "मॉडेलने केलेली ओळख",
    healthy: "पीक निरोगी दिसत आहे",
    uncertain: "अनिश्चित निष्कर्ष",
    diseaseDetected: "संभाव्य रोग आढळला",
    healthyDescription: "अपलोड केलेल्या छायाचित्रात मॉडेलला रोगाची लक्षणे आढळली नाहीत.",
    uncertainDescription: "मॉडेलला पिकाची स्थिती निश्चितपणे ओळखता आली नाही.",
    diseaseDescription: "मॉडेलने संभाव्य रोगाची लक्षणे ओळखली आहेत. शेतात तपासणी करून या निष्कर्षाची खात्री करा.",
    identifiedCrop: "ओळखलेले पीक",
    cropDescription: "विश्लेषणादरम्यान निवडलेले किंवा ओळखलेले पीक",
    confidence: "मॉडेलचा विश्वास स्तर",
    confidenceDescription: "हा मॉडेलचा विश्वास गुण आहे; निदान अचूक असल्याची हमी नाही.",
    plantPart: "वनस्पतीचा भाग",
    plantPartDescription: "फोटो अपलोड करताना निवडलेला वनस्पतीचा भाग",
    farmContext: "शेताची माहिती",
    analysisInformation: "विश्लेषणाची माहिती",
    farmer: "शेतकरी",
    selectedField: "निवडलेले शेत",
    registeredCrop: "नोंदणीकृत पीक",
    cropVariety: "पिकाची जात",
    soilType: "मातीचा प्रकार",
    irrigation: "सिंचन",
    location: "ठिकाण",
    analysisTime: "विश्लेषणाची वेळ",
    actionPlan: "शेतासाठी कृती योजना",
    nextSteps: "पुढे काय करावे",
    recommendationIntro: "मॉडेलने ओळखलेल्या स्थितीनुसार सामान्य सूचना:",
    healthyRec1: "शेताची नियमित पाहणी करा आणि पिकांचे निरीक्षण सुरू ठेवा.",
    healthyRec2: "पिकाच्या गरजेनुसार जमिनीतील ओलावा आणि सिंचन तपासा.",
    healthyRec3: "पिकावर दिसणारी नवीन लक्षणे किंवा बदल यांची नोंद ठेवा.",
    diseaseRec1: "आजूबाजूच्या झाडांवरही पानांवरील डाग, जखमा, रंग बदल किंवा पसरणारी लक्षणे आहेत का ते तपासा.",
    diseaseRec2: "गरज नसताना वरून पाणी देणे टाळा आणि पिकांमध्ये हवा खेळती राहते का ते पाहा.",
    diseaseRec3: "लक्षणांमधील बदल पाहण्यासाठी बाधित आणि निरोगी झाडांचे स्वतंत्र फोटो काढा.",
    diseaseRec4: "कोणताही उपचार निवडण्यापूर्वी स्थानिक कृषी तज्ज्ञ किंवा कृषी अधिकाऱ्यांचा सल्ला घ्या.",
    virusRec1: "पानांची वळणे, मोझॅकसारखे नमुने, असामान्य रंगबदल आणि खुंटलेली वाढ तपासा.",
    virusRec2: "आजूबाजूच्या झाडांवरही अशीच लक्षणे दिसतात का ते पाहा.",
    virusRec3: "मावा किंवा पांढरी माशी यांसारख्या कीटकांची तपासणी करा.",
    virusRec4: "नियंत्रणाचे उपाय करण्यापूर्वी कृषी तज्ज्ञांकडून खात्री करून घ्या.",
    generalRec1: "बाधित झाडाचे बारकाईने निरीक्षण करा आणि त्याच शेतातील निरोगी झाडांशी तुलना करा.",
    generalRec2: "दिसणारी लक्षणे, बाधित भाग आणि त्यांचा प्रसार यांची नोंद ठेवा.",
    generalRec3: "पुढील काही दिवस बाधित क्षेत्रावर लक्ष ठेवा आणि पुन्हा फोटो काढा.",
    generalRec4: "रोग नियंत्रणासाठी कोणताही उपचार करण्यापूर्वी कृषी तज्ज्ञांचा सल्ला घ्या.",
    modelOutput: "मॉडेलचा निष्कर्ष",
    alternatives: "इतर संभाव्य निष्कर्ष",
    disclaimerTitle: "एआय आधारित अंदाज, निश्चित निदान नाही",
    disclaimer: "छायाचित्रावर आधारित अंदाजावर प्रकाश, फोटोची गुणवत्ता, पिकाची जात आणि सारखी दिसणारी लक्षणे यांचा परिणाम होऊ शकतो. उपचाराचा निर्णय घेण्यापूर्वी शेतात प्रत्यक्ष पाहणी करा आणि पात्र कृषी तज्ज्ञांचा सल्ला घ्या. केवळ या अंदाजावरून कीटकनाशके किंवा इतर रसायनांचा वापर करू नका.",
    scoreNote: "मॉडेलचा विश्वास गुण",
    unknown: "अज्ञात",
    leaf: "पान",
    stem: "खोड",
    fruit: "फळ",
    root: "मूळ",
    wholePlant: "संपूर्ण वनस्पती",
    other: "इतर",
    tomato: "टोमॅटो",
    potato: "बटाटा",
    apple: "सफरचंद",
    grape: "द्राक्ष",
    corn: "मका",
    rice: "तांदूळ",
    healthyDisease: "निरोगी",
    lateBlight: "उशिरा येणारा करपा रोग",
    earlyBlight: "लवकर येणारा करपा रोग",
    leafRust: "पानावरील तांबेरा रोग",
    stemRust: "खोडावरील तांबेरा रोग",
    commonRust: "सामान्य तांबेरा रोग",
    powderyMildew: "भुरी रोग",
    downyMildew: "केवडा रोग",
    bacterialLeafBlight: "जिवाणूजन्य पानावरील करपा रोग",
    bacterialSpot: "जिवाणूजन्य ठिपक्यांचा रोग",
    leafSpot: "पानावरील ठिपक्यांचा रोग",
    septoriaLeafSpot: "सेप्टोरिया पानावरील ठिपक्यांचा रोग",
    targetSpot: "लक्ष्याकार ठिपक्यांचा रोग",
    leafMold: "पानावरील बुरशीजन्य रोग",
    mosaicVirus: "मोझॅक विषाणूजन्य रोग",
    yellowLeafCurlVirus: "पिवळा पान गुंडाळी विषाणू रोग",
    appleScab: "सफरचंदावरील खवले रोग",
    blackRot: "काळी कुज रोग",
    esca: "एस्का रोग",
    cedarAppleRust: "देवदार-सफरचंद तांबेरा रोग",
    cercospora: "सर्कोस्पोरा पानावरील ठिपक्यांचा रोग",
    anthracnose: "करपा / अँथ्रॅक्नोज रोग",
    blackMeasles: "काळा गोवर रोग",
    spiderMites: "कोळी किडीचा प्रादुर्भाव",
    unknownDisease: "अज्ञात पीक समस्या"
  }
};

// Normalize AI model labels into consistent disease keys.
const normalizeLabel = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/___/g, " ")
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const diseaseDictionary = {
  "healthy": "healthyDisease",
  "healthy plant": "healthyDisease",
  "late blight": "lateBlight",
  "potato late blight": "lateBlight",
  "tomato late blight": "lateBlight",
  "early blight": "earlyBlight",
  "potato early blight": "earlyBlight",
  "tomato early blight": "earlyBlight",
  "leaf rust": "leafRust",
  "stem rust": "stemRust",
  "common rust": "commonRust",
  "powdery mildew": "powderyMildew",
  "downy mildew": "downyMildew",
  "bacterial leaf blight": "bacterialLeafBlight",
  "bacterial blight": "bacterialLeafBlight",
  "bacterial spot": "bacterialSpot",
  "leaf spot": "leafSpot",
  "septoria leaf spot": "septoriaLeafSpot",
  "target spot": "targetSpot",
  "leaf mold": "leafMold",
  "leaf mould": "leafMold",
  "mosaic virus": "mosaicVirus",
  "tomato mosaic virus": "mosaicVirus",
  "yellow leaf curl virus": "yellowLeafCurlVirus",
  "tomato yellow leaf curl virus": "yellowLeafCurlVirus",
  "apple scab": "appleScab",
  "black rot": "blackRot",
  "esca": "esca",
  "cedar apple rust": "cedarAppleRust",
  "cercospora leaf spot": "cercospora",
  "anthracnose": "anthracnose",
  "black measles": "blackMeasles",
  "spider mites": "spiderMites",
  "spider mite": "spiderMites",
  "unknown": "unknownDisease",
  "unidentified": "unknownDisease",
  "unknown disease": "unknownDisease"
};

const cropDictionary = {
  tomato: "tomato",
  potato: "potato",
  apple: "apple",
  grape: "grape",
  grapes: "grape",
  corn: "corn",
  maize: "corn",
  rice: "rice"
};

const plantPartDictionary = {
  leaf: "leaf",
  leaves: "leaf",
  stem: "stem",
  fruit: "fruit",
  root: "root",
  "whole plant": "wholePlant",
  other: "other"
};

const soilDictionary = {
  clay: { en: "Clay", hi: "चिकनी मिट्टी", mr: "चिकणमाती" },
  "clay soil": { en: "Clay Soil", hi: "चिकनी मिट्टी", mr: "चिकणमाती" },
  sandy: { en: "Sandy", hi: "रेतीली मिट्टी", mr: "रेतीमाती" },
  "sandy soil": { en: "Sandy Soil", hi: "रेतीली मिट्टी", mr: "रेतीमाती" },
  loamy: { en: "Loamy", hi: "दोमट मिट्टी", mr: "पोयट्याची माती" },
  "loamy soil": { en: "Loamy Soil", hi: "दोमट मिट्टी", mr: "पोयट्याची माती" },
  black: { en: "Black Soil", hi: "काली मिट्टी", mr: "काळी माती" },
  "black soil": { en: "Black Soil", hi: "काली मिट्टी", mr: "काळी माती" },
  red: { en: "Red Soil", hi: "लाल मिट्टी", mr: "लाल माती" },
  "red soil": { en: "Red Soil", hi: "लाल मिट्टी", mr: "लाल माती" }
};

const irrigationDictionary = {
  drip: { en: "Drip Irrigation", hi: "ड्रिप सिंचाई", mr: "ठिबक सिंचन" },
  sprinkler: { en: "Sprinkler Irrigation", hi: "स्प्रिंकलर सिंचाई", mr: "तुषार सिंचन" },
  flood: { en: "Flood Irrigation", hi: "बाढ़ सिंचाई", mr: "पाटाने सिंचन" },
  rainfed: { en: "Rainfed", hi: "वर्षा आधारित", mr: "पावसावर आधारित" },
  manual: { en: "Manual Irrigation", hi: "हाथ से सिंचाई", mr: "हाताने सिंचन" }
};

const formatLabel = (value) => {
  if (!value) return "";
  return String(value)
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const formatConfidence = (value, t) => {
  if (value === null || value === undefined || value === "") {
    return t("notAvailable");
  }

  const number = Number(value);
  if (Number.isNaN(number)) return t("notAvailable");

  return `${(number <= 1 ? number * 100 : number).toFixed(1)}%`;
};

const getTranslatedLabel = (value, language, t) => {
  const normalized = normalizeLabel(value);

  if (!normalized) return t("notAvailable");

  // Remove crop prefix from common model labels, e.g. Tomato Late Blight.
  const diseaseName = normalized.includes(" ")
    ? normalized.substring(normalized.indexOf(" ") + 1)
    : normalized;

  const diseaseKey =
    diseaseDictionary[normalized] ||
    diseaseDictionary[diseaseName];

  if (diseaseKey) return t(diseaseKey);

  const cropKey = cropDictionary[normalized];
  if (cropKey) return t(cropKey);

  const partKey = plantPartDictionary[normalized];
  if (partKey) return t(partKey);

  // Preserve unknown model labels rather than inventing translations.
  return formatLabel(value);
};

const getConditionStatus = (condition, t) => {
  const value = normalizeLabel(condition);

  if (
    value.includes("healthy") ||
    value.includes("normal") ||
    value.includes("no disease")
  ) {
    return {
      label: t("healthy"),
      className: "diagnosis-status-healthy",
      description: t("healthyDescription")
    };
  }

  if (
    value.includes("unknown") ||
    value.includes("uncertain") ||
    value.includes("unidentified")
  ) {
    return {
      label: t("uncertain"),
      className: "diagnosis-status-uncertain",
      description: t("uncertainDescription")
    };
  }

  return {
    label: t("diseaseDetected"),
    className: "diagnosis-status-warning",
    description: t("diseaseDescription")
  };
};

const getRecommendations = (condition, t) => {
  const value = normalizeLabel(condition);

  if (
    value.includes("healthy") ||
    value.includes("normal") ||
    value.includes("no disease")
  ) {
    return [
      t("healthyRec1"),
      t("healthyRec2"),
      t("healthyRec3")
    ];
  }

  if (
    value.includes("virus") ||
    value.includes("mosaic") ||
    value.includes("curl")
  ) {
    return [
      t("virusRec1"),
      t("virusRec2"),
      t("virusRec3"),
      t("virusRec4")
    ];
  }

  if (
    value.includes("blight") ||
    value.includes("spot") ||
    value.includes("rot") ||
    value.includes("mildew") ||
    value.includes("rust") ||
    value.includes("scab") ||
    value.includes("anthracnose") ||
    value.includes("esca") ||
    value.includes("cercospora")
  ) {
    return [
      t("diseaseRec1"),
      t("diseaseRec2"),
      t("diseaseRec3"),
      t("diseaseRec4")
    ];
  }

  return [
    t("generalRec1"),
    t("generalRec2"),
    t("generalRec3"),
    t("generalRec4")
  ];
};

function AIDiagnosis({
  farmer,
  fields = [],
  locations = [],
  prediction
}) {
  const { language } = useLanguage();
  const currentLanguage = translations[language] ? language : "en";
  const t = (key) =>
    translations[currentLanguage][key] ??
    translations.en[key] ??
    key;

  const condition =
    prediction?.condition || prediction?.class_name || "";

  const crop =
    prediction?.selectedCrop ||
    prediction?.crop ||
    prediction?.predicted_crop ||
    "";

  const confidence =
    prediction?.confidence ??
    prediction?.prediction_confidence ??
    null;

  const status = getConditionStatus(condition, t);
  const recommendations = getRecommendations(condition, t);

  const selectedField = fields.find(
    (field) =>
      String(field._id) === String(prediction?.fieldId)
  );

  const selectedLocation = locations.find(
    (location) =>
      String(
        typeof location.fieldId === "object"
          ? location.fieldId?._id
          : location.fieldId
      ) === String(prediction?.fieldId)
  );

  const topPredictions = Array.isArray(prediction?.top_predictions)
    ? prediction.top_predictions
    : [];

  const analyzedAt = prediction?.analyzedAt
    ? new Date(prediction.analyzedAt).toLocaleString(
        currentLanguage === "hi"
          ? "hi-IN"
          : currentLanguage === "mr"
            ? "mr-IN"
            : "en-IN",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit"
        }
      )
    : t("notAvailable");

  const locationName = [
    selectedLocation?.village,
    selectedLocation?.district,
    selectedLocation?.state
  ]
    .filter(Boolean)
    .join(", ");

  const translateSoil = (value) => {
    const key = normalizeLabel(value);
    return soilDictionary[key]?.[currentLanguage] || formatLabel(value) || t("notAvailable");
  };

  const translateIrrigation = (value) => {
    const key = normalizeLabel(value);
    return irrigationDictionary[key]?.[currentLanguage] || formatLabel(value) || t("notAvailable");
  };

  if (!prediction) {
    return (
      <section className="ai-diagnosis-page">
        <div className="ai-diagnosis-heading">
          <span className="ai-diagnosis-eyebrow">
            {t("eyebrow")}
          </span>
          <h1>{t("heading")}</h1>
          <p>{t("headingDescription")}</p>
        </div>

        <div className="diagnosis-empty-card">
          <div className="diagnosis-empty-icon">✳</div>

          <span className="diagnosis-empty-label">
            {t("emptyLabel")}
          </span>

          <h2>{t("emptyTitle")}</h2>

          <p>{t("emptyDescription")}</p>

          <div className="diagnosis-empty-steps">
            <div>
              <span>01</span>
              <p>{t("step1")}</p>
            </div>
            <div>
              <span>02</span>
              <p>{t("step2")}</p>
            </div>
            <div>
              <span>03</span>
              <p>{t("step3")}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="ai-diagnosis-page">
      <div className="ai-diagnosis-heading">
        <span className="ai-diagnosis-eyebrow">
          {t("eyebrow")}
        </span>
        <h1>{t("heading")}</h1>
        <p>{t("headingDescription")}</p>
      </div>

      {/* Diagnosis result */}
      <div className="diagnosis-result-banner">
        <div className="diagnosis-result-icon">✳</div>

        <div className="diagnosis-result-main">
          <span className="diagnosis-result-eyebrow">
            {t("modelIdentification")}
          </span>
          <h2>{getTranslatedLabel(condition, currentLanguage, t)}</h2>
          <p>{status.description}</p>
        </div>

        <span className={`diagnosis-status-badge ${status.className}`}>
          <span className="diagnosis-status-dot" />
          {status.label}
        </span>
      </div>

      {/* Key information */}
      <div className="diagnosis-overview-grid">
        <div className="diagnosis-info-card">
          <span className="diagnosis-card-label">
            {t("identifiedCrop")}
          </span>
          <div className="diagnosis-info-value">
            <span className="diagnosis-info-symbol">01</span>
            <h3>{getTranslatedLabel(crop, currentLanguage, t)}</h3>
          </div>
          <p>{t("cropDescription")}</p>
        </div>

        <div className="diagnosis-info-card">
          <span className="diagnosis-card-label">
            {t("confidence")}
          </span>
          <div className="diagnosis-info-value">
            <span className="diagnosis-info-symbol">02</span>
            <h3>{formatConfidence(confidence, t)}</h3>
          </div>
          <p>{t("confidenceDescription")}</p>
        </div>

        <div className="diagnosis-info-card">
          <span className="diagnosis-card-label">
            {t("plantPart")}
          </span>
          <div className="diagnosis-info-value">
            <span className="diagnosis-info-symbol">03</span>
            <h3>
              {getTranslatedLabel(prediction.plantPart, currentLanguage, t)}
            </h3>
          </div>
          <p>{t("plantPartDescription")}</p>
        </div>
      </div>

      {/* Main information panels */}
      <div className="diagnosis-content-grid">
        <div className="diagnosis-details-card">
          <div className="diagnosis-panel-heading">
            <div>
              <span className="diagnosis-card-label">
                {t("farmContext")}
              </span>
              <h3>{t("analysisInformation")}</h3>
            </div>
            <span className="diagnosis-panel-icon">⌖</span>
          </div>

          <div className="diagnosis-detail-list">
            <div className="diagnosis-detail-row">
              <span>{t("farmer")}</span>
              <strong>{farmer?.fullName || t("notAvailable")}</strong>
            </div>

            <div className="diagnosis-detail-row">
              <span>{t("selectedField")}</span>
              <strong>
                {prediction.fieldName ||
                  selectedField?.fieldName ||
                  t("notAvailable")}
              </strong>
            </div>

            <div className="diagnosis-detail-row">
              <span>{t("registeredCrop")}</span>
              <strong>
                {getTranslatedLabel(selectedField?.cropName, currentLanguage, t)}
              </strong>
            </div>

            <div className="diagnosis-detail-row">
              <span>{t("cropVariety")}</span>
              <strong>
                {selectedField?.cropVariety || t("notSpecified")}
              </strong>
            </div>

            <div className="diagnosis-detail-row">
              <span>{t("soilType")}</span>
              <strong>{translateSoil(selectedField?.soilType)}</strong>
            </div>

            <div className="diagnosis-detail-row">
              <span>{t("irrigation")}</span>
              <strong>{translateIrrigation(selectedField?.irrigationMethod)}</strong>
            </div>

            <div className="diagnosis-detail-row">
              <span>{t("location")}</span>
              <strong>{locationName || t("notAvailable")}</strong>
            </div>

            <div className="diagnosis-detail-row">
              <span>{t("analysisTime")}</span>
              <strong>{analyzedAt}</strong>
            </div>
          </div>
        </div>

        <div className="diagnosis-recommendations-card">
          <div className="diagnosis-panel-heading">
            <div>
              <span className="diagnosis-card-label">
                {t("actionPlan")}
              </span>
              <h3>{t("nextSteps")}</h3>
            </div>
            <span className="diagnosis-panel-icon">✧</span>
          </div>

          <p className="diagnosis-recommendation-intro">
            {t("recommendationIntro")}
          </p>

          <div className="diagnosis-recommendation-list">
            {recommendations.map((recommendation, index) => (
              <div
                className="diagnosis-recommendation-item"
                key={index}
              >
                <span className="diagnosis-recommendation-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p>{recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Other model predictions */}
      {topPredictions.length > 0 && (
        <div className="diagnosis-alternatives-card">
          <div className="diagnosis-panel-heading">
            <div>
              <span className="diagnosis-card-label">
                {t("modelOutput")}
              </span>
              <h3>{t("alternatives")}</h3>
            </div>
          </div>

          <div className="diagnosis-alternatives-list">
            {topPredictions.map((item, index) => {
              const label =
                typeof item === "string"
                  ? item
                  : item.class ||
                    item.condition ||
                    item.label ||
                    item.name ||
                    "Unknown";

              const score =
                typeof item === "object"
                  ? item.confidence ??
                    item.probability ??
                    item.score
                  : null;

              return (
                <div
                  className="diagnosis-alternative-row"
                  key={`${label}-${index}`}
                >
                  <div className="diagnosis-alternative-name">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>
                      {getTranslatedLabel(label, currentLanguage, t)}
                    </strong>
                  </div>

                  <strong>
                    {score !== null && score !== undefined
                      ? formatConfidence(score, t)
                      : "—"}
                  </strong>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="diagnosis-disclaimer">
        <span className="diagnosis-disclaimer-icon">i</span>
        <div>
          <strong>{t("disclaimerTitle")}</strong>
          <p>{t("disclaimer")}</p>
        </div>
      </div>
    </section>
  );
}

export default AIDiagnosis;
