
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import Logo from "../../components/Logo";
import FarmMap from "../../components/FarmMap";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "https://dhara-ai-backend-l5lo.onrender.com/api/auth"
).replace(/\/auth\/?$/, "");

const locationTranslations = {
  en: {
    language: "Language",
    back: "← Back to setup",
    kicker: "ONBOARDING / STEP 03",
    heading: "Where is your",
    headingEm: "farm?",
    intro:
      "Help DHARA identify your farm's geographical location. This information will later be used for satellite imagery and field monitoring.",
    step: "STEP 3 OF 3",
    selectField: "Select your field",
    selectFieldDesc: "Choose the field whose location you are adding.",
    savedField: "SAVED FIELD *",
    loadingFields: "Loading your fields...",
    noFields: "No saved fields available",
    address: "Farm address",
    addressDesc: "Enter the administrative location of your farmland.",
    village: "VILLAGE *",
    villagePlaceholder: "Enter village name",
    taluka: "TALUKA / TEHSIL *",
    talukaPlaceholder: "Enter taluka",
    district: "DISTRICT *",
    districtPlaceholder: "Enter district",
    state: "STATE *",
    statePlaceholder: "Enter state",
    pincode: "PINCODE *",
    pincodePlaceholder: "6-digit pincode",
    coordinates: "Geographical coordinates",
    coordinatesDesc:
      "Detect your farm's GPS coordinates or enter them manually.",
    detectTitle: "Detect farm location",
    detectDesc: "Allow browser location access while you are at your farm.",
    detecting: "Detecting...",
    detectButton: "Detect GPS location",
    latitude: "LATITUDE *",
    longitude: "LONGITUDE *",
    latitudePlaceholder: "e.g. 18.520430",
    longitudePlaceholder: "e.g. 73.856744",
    boundary: "Draw your farm boundary",
    boundaryDesc:
      "Use the polygon drawing tool to mark the actual perimeter of your farmland.",
    boundarySelected: "Farm boundary selected successfully.",
    mappedArea: "Estimated mapped area:",
    hectares: "hectares",
    editPolygon: "You can edit or delete the polygon using the map tools.",
    drawPolygon:
      "Draw a polygon around your farmland using the polygon tool on the map. The area will be calculated automatically.",
    cancel: "Cancel",
    saving: "Saving...",
    save: "Save location",
    signIn: "Please sign in again to continue.",
    fetchError: "Unable to fetch your fields.",
    loadError: "Unable to load your fields.",
    noSavedFields:
      "No saved fields found. Please complete Field Information first.",
    gpsUnsupported:
      "Your browser does not support GPS location detection.",
    gpsSuccess: "GPS coordinates detected successfully.",
    gpsError:
      "Unable to detect location. Allow GPS access or enter coordinates manually.",
    sessionExpired:
      "Your session has expired. Please sign in again.",
    selectFieldError: "Please select a field first.",
    boundaryError:
      "Please draw your farm boundary on the map before saving.",
    saveError: "Unable to save farm location.",
    success:
      "Farm location and boundary saved successfully!",
    generalError: "Something went wrong. Please try again.",
  },

  hi: {
    language: "भाषा",
    back: "← सेटअप पर वापस जाएँ",
    kicker: "पंजीकरण / चरण 03",
    heading: "आपका",
    headingEm: "खेत कहाँ है?",
    intro:
      "DHARA को अपने खेत का भौगोलिक स्थान पहचानने में मदद करें। इस जानकारी का उपयोग आगे चलकर सैटेलाइट इमेजरी और खेत की निगरानी के लिए किया जाएगा।",
    step: "चरण 3 / 3",
    selectField: "अपना खेत चुनें",
    selectFieldDesc: "उस खेत को चुनें जिसका स्थान आप जोड़ना चाहते हैं।",
    savedField: "सेव किया गया खेत *",
    loadingFields: "आपके खेत लोड हो रहे हैं...",
    noFields: "कोई सेव किया गया खेत उपलब्ध नहीं है",
    address: "खेत का पता",
    addressDesc: "अपनी कृषि भूमि का प्रशासनिक स्थान दर्ज करें।",
    village: "गाँव *",
    villagePlaceholder: "गाँव का नाम दर्ज करें",
    taluka: "तालुका / तहसील *",
    talukaPlaceholder: "तालुका दर्ज करें",
    district: "जिला *",
    districtPlaceholder: "जिला दर्ज करें",
    state: "राज्य *",
    statePlaceholder: "राज्य दर्ज करें",
    pincode: "पिनकोड *",
    pincodePlaceholder: "6 अंकों का पिनकोड",
    coordinates: "भौगोलिक निर्देशांक",
    coordinatesDesc:
      "अपने खेत के GPS निर्देशांक प्राप्त करें या उन्हें स्वयं दर्ज करें।",
    detectTitle: "खेत का स्थान पता करें",
    detectDesc: "खेत पर रहते हुए ब्राउज़र को स्थान की अनुमति दें।",
    detecting: "पता लगाया जा रहा है...",
    detectButton: "GPS स्थान पता करें",
    latitude: "अक्षांश (LATITUDE) *",
    longitude: "देशांतर (LONGITUDE) *",
    latitudePlaceholder: "जैसे 18.520430",
    longitudePlaceholder: "जैसे 73.856744",
    boundary: "अपने खेत की सीमा बनाएँ",
    boundaryDesc:
      "अपने खेत की वास्तविक सीमा चिह्नित करने के लिए नक्शे पर पॉलीगॉन टूल का उपयोग करें।",
    boundarySelected: "खेत की सीमा सफलतापूर्वक चुनी गई।",
    mappedArea: "नक्शे पर अनुमानित क्षेत्रफल:",
    hectares: "हेक्टेयर",
    editPolygon: "आप नक्शे के टूल से पॉलीगॉन को बदल या हटा सकते हैं।",
    drawPolygon:
      "नक्शे पर पॉलीगॉन टूल का उपयोग करके अपने खेत की सीमा बनाएँ। क्षेत्रफल अपने आप मापा जाएगा।",
    cancel: "रद्द करें",
    saving: "सेव हो रहा है...",
    save: "स्थान सेव करें",
    signIn: "जारी रखने के लिए कृपया दोबारा साइन इन करें।",
    fetchError: "आपके खेतों की जानकारी प्राप्त नहीं हो सकी।",
    loadError: "आपके खेत लोड नहीं हो सके।",
    noSavedFields:
      "कोई सेव किया गया खेत नहीं मिला। कृपया पहले Field Information पूरा करें।",
    gpsUnsupported:
      "आपका ब्राउज़र GPS स्थान का पता लगाने की सुविधा का समर्थन नहीं करता।",
    gpsSuccess: "GPS निर्देशांक सफलतापूर्वक प्राप्त हुए।",
    gpsError:
      "स्थान का पता नहीं चल सका। GPS की अनुमति दें या निर्देशांक स्वयं दर्ज करें।",
    sessionExpired:
      "आपका सेशन समाप्त हो गया है। कृपया दोबारा साइन इन करें।",
    selectFieldError: "कृपया पहले एक खेत चुनें।",
    boundaryError:
      "सेव करने से पहले कृपया नक्शे पर अपने खेत की सीमा बनाएँ।",
    saveError: "खेत का स्थान सेव नहीं हो सका।",
    success: "खेत का स्थान और सीमा सफलतापूर्वक सेव हो गए!",
    generalError: "कुछ गलत हुआ। कृपया दोबारा प्रयास करें।",
  },

  mr: {
    language: "भाषा",
    back: "← सेटअपवर परत जा",
    kicker: "नोंदणी / टप्पा 03",
    heading: "तुमचे",
    headingEm: "शेत कुठे आहे?",
    intro:
      "DHARA ला तुमच्या शेताचे भौगोलिक स्थान ओळखण्यास मदत करा. या माहितीचा उपयोग पुढे उपग्रह प्रतिमा आणि शेताच्या निरीक्षणासाठी केला जाईल.",
    step: "टप्पा 3 / 3",
    selectField: "तुमचे शेत निवडा",
    selectFieldDesc: "ज्या शेताचे स्थान जोडायचे आहे ते शेत निवडा.",
    savedField: "जतन केलेले शेत *",
    loadingFields: "तुमची शेते लोड होत आहेत...",
    noFields: "जतन केलेले शेत उपलब्ध नाही",
    address: "शेताचा पत्ता",
    addressDesc: "तुमच्या शेतीच्या जमिनीचे प्रशासकीय स्थान लिहा.",
    village: "गाव *",
    villagePlaceholder: "गावाचे नाव लिहा",
    taluka: "तालुका *",
    talukaPlaceholder: "तालुका लिहा",
    district: "जिल्हा *",
    districtPlaceholder: "जिल्हा लिहा",
    state: "राज्य *",
    statePlaceholder: "राज्य लिहा",
    pincode: "पिनकोड *",
    pincodePlaceholder: "6 अंकी पिनकोड",
    coordinates: "भौगोलिक निर्देशांक",
    coordinatesDesc:
      "तुमच्या शेताचे GPS निर्देशांक मिळवा किंवा ते स्वतः भरा.",
    detectTitle: "शेताचे स्थान शोधा",
    detectDesc: "शेतावर असताना ब्राउझरला स्थान वापरण्याची परवानगी द्या.",
    detecting: "स्थान शोधत आहे...",
    detectButton: "GPS स्थान शोधा",
    latitude: "अक्षांश (LATITUDE) *",
    longitude: "रेखांश (LONGITUDE) *",
    latitudePlaceholder: "उदा. 18.520430",
    longitudePlaceholder: "उदा. 73.856744",
    boundary: "तुमच्या शेताची सीमा आखा",
    boundaryDesc:
      "तुमच्या शेताची वास्तविक सीमा दर्शवण्यासाठी नकाशावरील बहुभुज साधन वापरा.",
    boundarySelected: "शेताची सीमा यशस्वीरित्या निवडली आहे.",
    mappedArea: "नकाशावर मोजलेले अंदाजे क्षेत्रफळ:",
    hectares: "हेक्टर",
    editPolygon: "नकाशावरील साधनांचा वापर करून तुम्ही बहुभुज बदलू किंवा हटवू शकता.",
    drawPolygon:
      "नकाशावरील बहुभुज साधन वापरून तुमच्या शेताची सीमा आखा. क्षेत्रफळ आपोआप मोजले जाईल.",
    cancel: "रद्द करा",
    saving: "माहिती सेव्ह होत आहे...",
    save: "स्थान सेव्ह करा",
    signIn: "पुढे जाण्यासाठी कृपया पुन्हा साइन इन करा.",
    fetchError: "तुमच्या शेतांची माहिती मिळवता आली नाही.",
    loadError: "तुमची शेते लोड करता आली नाहीत.",
    noSavedFields:
      "जतन केलेले शेत सापडले नाही. कृपया प्रथम Field Information पूर्ण करा.",
    gpsUnsupported:
      "तुमचा ब्राउझर GPS स्थान शोधण्याच्या सुविधेला समर्थन देत नाही.",
    gpsSuccess: "GPS निर्देशांक यशस्वीरित्या मिळाले.",
    gpsError:
      "स्थान शोधता आले नाही. GPS परवानगी द्या किंवा निर्देशांक स्वतः भरा.",
    sessionExpired:
      "तुमचे सत्र संपले आहे. कृपया पुन्हा साइन इन करा.",
    selectFieldError: "कृपया प्रथम एक शेत निवडा.",
    boundaryError:
      "सेव्ह करण्यापूर्वी कृपया नकाशावर तुमच्या शेताची सीमा आखा.",
    saveError: "शेताचे स्थान सेव्ह करता आले नाही.",
    success: "शेताचे स्थान आणि सीमा यशस्वीरित्या सेव्ह झाली!",
    generalError: "काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा.",
  },
};

function LocationInformation() {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();

  const t =
    locationTranslations[language] || locationTranslations.en;

  const [formData, setFormData] = useState({
    fieldId: "",
    village: "",
    taluka: "",
    district: "",
    state: "",
    pincode: "",
    latitude: "",
    longitude: "",
  });

  const [fields, setFields] = useState([]);
  const [message, setMessage] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);
  const [loadingFields, setLoadingFields] = useState(true);
  const [saving, setSaving] = useState(false);

  // Stores the farm polygon and its calculated area.
  const [boundaryData, setBoundaryData] = useState({
    boundary: null,
    boundaryArea: null,
  });

  // Automatically updates the map center from GPS coordinates.
  const mapCenter = useMemo(() => {
    const latitude = Number(formData.latitude);
    const longitude = Number(formData.longitude);

    if (
      formData.latitude !== "" &&
      formData.longitude !== "" &&
      Number.isFinite(latitude) &&
      Number.isFinite(longitude) &&
      latitude >= -90 &&
      latitude <= 90 &&
      longitude >= -180 &&
      longitude <= 180
    ) {
      return [latitude, longitude];
    }

    return [20.5937, 78.9629];
  }, [formData.latitude, formData.longitude]);

  // Fetch the farmer's saved fields.
  useEffect(() => {
    const fetchFields = async () => {
      try {
        const token = localStorage.getItem("dhara_token");

        if (!token) {
          setMessage(t.signIn);
          return;
        }

        const response = await fetch(`${API_BASE_URL}/field`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || t.fetchError);
        }

        setFields(data.fields || []);

        if (data.fields?.length > 0) {
          setFormData((previous) => ({
            ...previous,
            fieldId: data.fields[0]._id,
          }));
        } else {
          setMessage(t.noSavedFields);
        }
      } catch (error) {
        console.error("Fetch Fields Error:", error);
        setMessage(error.message || t.loadError);
      } finally {
        setLoadingFields(false);
      }
    };

    fetchFields();
  }, []);

  // Handle all form input changes.
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");

    // A boundary belongs to a particular field.
    // Clear it when the selected field changes.
    if (name === "fieldId") {
      setBoundaryData({
        boundary: null,
        boundaryArea: null,
      });
    }
  };

  // Detect GPS coordinates.
  const detectLocation = () => {
    if (!navigator.geolocation) {
      setMessage(t.gpsUnsupported);
      return;
    }

    setLocationLoading(true);
    setMessage("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((previous) => ({
          ...previous,
          latitude: position.coords.latitude.toFixed(6),
          longitude: position.coords.longitude.toFixed(6),
        }));

        setLocationLoading(false);
        setMessage(t.gpsSuccess);
      },
      () => {
        setLocationLoading(false);
        setMessage(t.gpsError);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  // Receive the drawn farm boundary from FarmMap.
  const handleBoundaryChange = (data) => {
    setBoundaryData(data);
  };

  // Save location and farm boundary.
  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setSaving(true);

    try {
      const token = localStorage.getItem("dhara_token");

      if (!token) {
        throw new Error(t.sessionExpired);
      }

      if (!formData.fieldId) {
        throw new Error(t.selectFieldError);
      }

      if (!boundaryData.boundary) {
        throw new Error(t.boundaryError);
      }

      const payload = {
        fieldId: formData.fieldId,
        village: formData.village.trim(),
        taluka: formData.taluka.trim(),
        district: formData.district.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode,
        latitude: Number(formData.latitude),
        longitude: Number(formData.longitude),
        boundary: boundaryData.boundary,
        boundaryArea: boundaryData.boundaryArea,
      };

      const response = await fetch(`${API_BASE_URL}/location`, {
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

      // Mark Location Information as completed.
      localStorage.setItem("dhara_location_completed", "true");

      setMessage(t.success);

      setTimeout(() => {
        navigate("/onboarding/sensors");
      }, 1000);
    } catch (error) {
      console.error("Save Location Error:", error);
      setMessage(error.message || t.generalError);
    } finally {
      setSaving(false);
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
            <span className="active" />
            <small>{t.step}</small>
          </div>
        </div>

        <form className="farmer-form" onSubmit={handleSubmit}>
          <div className="form-section-heading">
            <span>01</span>
            <div>
              <h2>{t.selectField}</h2>
              <p>{t.selectFieldDesc}</p>
            </div>
          </div>

          <div className="form-grid">
            <label className="full-width">
              {t.savedField}
              <select
                name="fieldId"
                value={formData.fieldId}
                onChange={handleChange}
                required
                disabled={loadingFields || fields.length === 0}
              >
                {loadingFields && (
                  <option value="">{t.loadingFields}</option>
                )}

                {!loadingFields && fields.length === 0 && (
                  <option value="">{t.noFields}</option>
                )}

                {fields.map((field) => (
                  <option key={field._id} value={field._id}>
                    {field.fieldName} — {field.cropName}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="form-section-heading second">
            <span>02</span>
            <div>
              <h2>{t.address}</h2>
              <p>{t.addressDesc}</p>
            </div>
          </div>

          <div className="form-grid">
            <label>
              {t.village}
              <input
                name="village"
                value={formData.village}
                onChange={handleChange}
                placeholder={t.villagePlaceholder}
                required
              />
            </label>

            <label>
              {t.taluka}
              <input
                name="taluka"
                value={formData.taluka}
                onChange={handleChange}
                placeholder={t.talukaPlaceholder}
                required
              />
            </label>

            <label>
              {t.district}
              <input
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder={t.districtPlaceholder}
                required
              />
            </label>

            <label>
              {t.state}
              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder={t.statePlaceholder}
                required
              />
            </label>

            <label>
              {t.pincode}
              <input
                name="pincode"
                type="text"
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength="6"
                value={formData.pincode}
                onChange={handleChange}
                placeholder={t.pincodePlaceholder}
                required
              />
            </label>
          </div>

          <div className="form-section-heading second">
            <span>03</span>
            <div>
              <h2>{t.coordinates}</h2>
              <p>{t.coordinatesDesc}</p>
            </div>
          </div>

          <div className="location-detect-panel">
            <div>
              <span className="location-icon">⌖</span>
              <div>
                <h3>{t.detectTitle}</h3>
                <p>{t.detectDesc}</p>
              </div>
            </div>

            <button
              type="button"
              className="location-detect-button"
              onClick={detectLocation}
              disabled={locationLoading}
            >
              {locationLoading ? t.detecting : t.detectButton}
            </button>
          </div>

          <div className="form-grid coordinate-grid">
            <label>
              {t.latitude}
              <input
                name="latitude"
                type="number"
                min="-90"
                max="90"
                step="any"
                value={formData.latitude}
                onChange={handleChange}
                placeholder={t.latitudePlaceholder}
                required
              />
            </label>

            <label>
              {t.longitude}
              <input
                name="longitude"
                type="number"
                min="-180"
                max="180"
                step="any"
                value={formData.longitude}
                onChange={handleChange}
                placeholder={t.longitudePlaceholder}
                required
              />
            </label>
          </div>

          {/* Interactive farm boundary map */}
          <div className="form-section-heading second">
            <span>04</span>
            <div>
              <h2>{t.boundary}</h2>
              <p>{t.boundaryDesc}</p>
            </div>
          </div>

          <div className="farm-map-section">
            <FarmMap
              key={`${mapCenter[0]}-${mapCenter[1]}`}
              center={mapCenter}
              onBoundaryChange={handleBoundaryChange}
            />

            <div className="farm-map-information">
              {boundaryData.boundary ? (
                <>
                  <p>
                    <strong>{t.boundarySelected}</strong>
                  </p>
                  <p>
                    {t.mappedArea}{" "}
                    <strong>
                      {boundaryData.boundaryArea} {t.hectares}
                    </strong>
                  </p>
                  <p>
                    <small>{t.editPolygon}</small>
                  </p>
                </>
              ) : (
                <p>{t.drawPolygon}</p>
              )}
            </div>
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
              disabled={saving}
            >
              {t.cancel}
            </button>

            <button
              type="submit"
              className="dark-button"
              disabled={saving || loadingFields || fields.length === 0}
            >
              {saving ? t.saving : t.save}
              {!saving && <span>↗</span>}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default LocationInformation;
