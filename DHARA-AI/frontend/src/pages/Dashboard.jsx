
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import "./Dashboard.css";
import SatelliteFieldHealth from "./dashboard/SatelliteFieldHealth";
import CropImageAnalysis from "./dashboard/CropImageAnalysis";
import AIDiagnosis from "./dashboard/AIDiagnosis";
import { useLanguage } from "../context/LanguageContext";
import AnalyticsRecommendations from "./dashboard/AnalyticsRecommendations";
import TemporalAnalysis from "./dashboard/TemporalAnalysis";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "https://dhara-ai-backend-l5lo.onrender.com/api/auth"
).replace(/\/auth\/?$/, "");

const navigation = [
  { name: "Overview", key: "overview", icon: "⌂", group: "MAIN WORKSPACE" },
  { name: "Satellite Field Health", key: "satelliteHealth", icon: "🛰️", group: "MAIN WORKSPACE" },
  { name: "Crop Image Analysis", key: "cropAnalysis", icon: "🌿", group: "MAIN WORKSPACE" },
  { name: "AI Diagnosis", key: "aiDiagnosis", icon: "✳", group: "MAIN WORKSPACE" },
  { name: "Analytics & Recommendations", key: "analytics", icon: "▥", group: "INSIGHTS" },
  { name: "Temporal Analysis", key: "temporalAnalysis", icon: "◷", group: "INSIGHTS" },
  { name: "Collected Data", key: "collectedData", icon: "▤", group: "MANAGEMENT" },
  { name: "Settings", key: "settings", icon: "⚙", group: "MANAGEMENT" },
];

function FarmIllustration() {
  return (
    <svg viewBox="0 0 560 330" className="farm-illustration" role="img" aria-label="Illustrated green farm landscape">
      <defs>
        <linearGradient id="farmSky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8f4d9" />
          <stop offset="100%" stopColor="#c9e4b9" />
        </linearGradient>
        <linearGradient id="farmHill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9fc98c" />
          <stop offset="100%" stopColor="#4d895b" />
        </linearGradient>
        <linearGradient id="farmField" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#79ad65" />
          <stop offset="100%" stopColor="#326e48" />
        </linearGradient>
      </defs>

      <circle cx="435" cy="62" r="35" fill="#f5d77e" />
      <path d="M0 177 Q100 88 206 172 T420 155 T560 142 V330 H0Z" fill="#b7d9a0" />
      <path d="M0 210 Q130 117 260 204 T560 178 V330 H0Z" fill="url(#farmHill)" />
      <path d="M0 263 Q150 188 290 239 T560 218 V330 H0Z" fill="#477f50" />
      <path d="M0 330 Q95 233 198 257 Q303 279 385 230 Q472 194 560 253 V330Z" fill="url(#farmField)" />

      <g opacity="0.42" fill="none" stroke="#d4e8b7" strokeWidth="5">
        <path d="M40 330 Q130 253 208 269" />
        <path d="M90 330 Q180 257 260 272" />
        <path d="M145 330 Q240 260 315 273" />
        <path d="M205 330 Q300 255 375 260" />
        <path d="M275 330 Q355 251 430 246" />
      </g>

      <g transform="translate(95 105)">
        <path d="M0 26 Q4 3 31 6 Q58 0 62 25 Q72 39 51 43 H12 Q-8 41 0 26Z" fill="#fff" opacity="0.88" />
        <path d="M18 18 Q23 1 43 9" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
      </g>

      <g transform="translate(355 94)">
        <path d="M0 20 Q5 1 25 5 Q44 -3 53 17 Q69 30 49 36 H9 Q-9 36 0 20Z" fill="#fff" opacity="0.8" />
      </g>

      <g transform="translate(350 155)">
        <path d="M0 12 L-9 23 L0 34 L9 23Z" fill="#28583c" />
        <path d="M0 22 L-31 22 M0 22 L31 22 M0 22 L0 -4" stroke="#28583c" strokeWidth="3" strokeLinecap="round" />
        <path d="M-31 17 L-31 27 M31 17 L31 27 M-5 -4 H5" stroke="#28583c" strokeWidth="3" strokeLinecap="round" />
        <circle cx="0" cy="22" r="5" fill="#e8f4d9" />
      </g>

      <g transform="translate(465 212)">
        <rect x="-3" y="18" width="7" height="40" rx="3" fill="#75583d" />
        <circle cx="0" cy="0" r="24" fill="#3f7950" />
        <circle cx="-15" cy="12" r="17" fill="#5b985d" />
        <circle cx="15" cy="13" r="16" fill="#77a966" />
      </g>

      <g transform="translate(52 228)">
        <path d="M0 30 Q-18 9 0 0 Q18 9 0 30Z" fill="#d4edb7" />
        <path d="M0 30 Q-20 23 -15 8 Q0 7 0 30Z" fill="#8fc578" />
        <path d="M0 30 Q20 23 15 8 Q0 7 0 30Z" fill="#a9d58d" />
        <path d="M0 30 V55" stroke="#e4e8be" strokeWidth="4" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function PlantIllustration() {
  return (
    <svg viewBox="0 0 150 140" className="mini-illustration" role="img" aria-label="Growing plant">
      <ellipse cx="75" cy="119" rx="49" ry="10" fill="#d5e5ce" />
      <path d="M75 112 Q72 77 75 43" stroke="#427b4c" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M73 79 Q29 83 36 45 Q66 42 73 79Z" fill="#79b36d" />
      <path d="M75 62 Q77 22 116 25 Q121 57 75 62Z" fill="#4e925b" />
      <path d="M74 96 Q103 57 126 79 Q114 111 74 96Z" fill="#9acb7e" />
      <path d="M75 79 L48 51 M75 62 L108 32 M75 96 L113 84" stroke="#d6edc4" strokeWidth="2" fill="none" />
      <path d="M35 111 Q75 126 115 111 L107 135 H43Z" fill="#bd825b" />
      <ellipse cx="75" cy="111" rx="40" ry="8" fill="#d39a70" />
    </svg>
  );
}

function SatelliteIllustration() {
  return (
    <svg viewBox="0 0 180 130" className="mini-illustration" role="img" aria-label="Satellite illustration">
      <g transform="rotate(-18 90 62)">
        <rect x="67" y="40" width="46" height="42" rx="8" fill="#d6e4c9" stroke="#497d55" strokeWidth="3" />
        <rect x="77" y="48" width="26" height="26" rx="4" fill="#477d70" />
        <path d="M80 51 L100 71 M100 51 L80 71" stroke="#a8d9b1" strokeWidth="2" />
        <rect x="15" y="45" width="43" height="31" rx="3" fill="#4b7582" />
        <path d="M24 45 V76 M35 45 V76 M46 45 V76 M15 55 H58 M15 66 H58" stroke="#a7d9d3" strokeWidth="1.5" />
        <rect x="122" y="45" width="43" height="31" rx="3" fill="#4b7582" />
        <path d="M131 45 V76 M142 45 V76 M153 45 V76 M122 55 H165 M122 66 H165" stroke="#a7d9d3" strokeWidth="1.5" />
        <path d="M58 60 H67 M113 60 H122 M90 40 V25" stroke="#497d55" strokeWidth="3" />
        <circle cx="90" cy="19" r="7" fill="#e7c56f" />
      </g>
      <path d="M34 105 Q90 75 146 105" fill="none" stroke="#82b76f" strokeWidth="3" strokeDasharray="5 5" />
    </svg>
  );
}

function AiIllustration() {
  return (
    <svg viewBox="0 0 150 140" className="mini-illustration" role="img" aria-label="AI crop analysis illustration">
      <rect x="28" y="22" width="94" height="94" rx="25" fill="#e2f0dc" />
      <rect x="43" y="37" width="64" height="60" rx="17" fill="#315e43" />
      <circle cx="62" cy="62" r="6" fill="#d6efba" />
      <circle cx="88" cy="62" r="6" fill="#d6efba" />
      <path d="M61 78 Q75 90 90 78" fill="none" stroke="#d6efba" strokeWidth="4" strokeLinecap="round" />
      <path d="M75 37 V23 M57 37 L48 25 M93 37 L102 25" stroke="#315e43" strokeWidth="4" strokeLinecap="round" />
      <path d="M17 60 H29 M121 60 H133 M75 116 V128" stroke="#86b876" strokeWidth="4" strokeLinecap="round" />
      <path d="M119 17 L124 27 L135 32 L124 37 L119 47 L114 37 L103 32 L114 27Z" fill="#e9c66e" />
    </svg>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="dashboard-section-heading">
      <span className="dashboard-kicker">{eyebrow}</span>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  );
}

function Dashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const [activeSection, setActiveSection] = useState("Overview");
  const [farmer, setFarmer] = useState(null);
  const [fields, setFields] = useState([]);
  const [locations, setLocations] = useState([]);
  const [cropPrediction, setCropPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchDashboardData = async () => {
    const token = localStorage.getItem("dhara_token");

    if (!token) {
      setError("Your session has expired. Please sign in again.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [farmerResponse, fieldResponse, locationResponse] =
        await Promise.all([
          fetch(`${API_BASE_URL}/farmer`, { headers }),
          fetch(`${API_BASE_URL}/field`, { headers }),
          fetch(`${API_BASE_URL}/location`, { headers }),
        ]);

      const farmerData = await farmerResponse.json();
      const fieldData = await fieldResponse.json();
      const locationData = await locationResponse.json();

      if (!farmerResponse.ok || !farmerData.success) {
        throw new Error(farmerData.message || "Unable to fetch farmer information.");
      }

      if (!fieldResponse.ok || !fieldData.success) {
        throw new Error(fieldData.message || "Unable to fetch field information.");
      }

      if (!locationResponse.ok || !locationData.success) {
        throw new Error(locationData.message || "Unable to fetch farm locations.");
      }

      setFarmer(farmerData.farmer || null);
      setFields(fieldData.fields || []);
      setLocations(locationData.locations || []);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Dashboard Data Error:", err);
      setError(err.message || "Unable to load dashboard information.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const displayName = farmer?.fullName || user?.name || "Farmer";

  const totalArea = fields.reduce(
    (total, field) => total + (Number(field.area) || 0),
    0
  );

  const formatDate = (date) => {
    if (!date) return "Not available";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatLabel = (value) => {
    if (!value) return "Not specified";

    return String(value)
      .replaceAll("_", " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  const openSection = (section) => setActiveSection(section);

  const renderOverview = () => (
    <>
      <div className="dashboard-hero">
        <div className="dashboard-hero-content">
          <span className="dashboard-kicker">{t("heroKicker")}</span>
          <h1>
            {t("heroTitle")} 
            <br />
            <em>{t("heroSubtitle")}</em>
          </h1>
          <p>
            {t("heroGreeting")}, {displayName}! {t("heroDescription")}
          </p>
          <button
            className="dashboard-primary-button"
            onClick={() => openSection("Satellite Field Health")}
          >
            {t("exploreSatellite")} <span>→</span>
          </button>
        </div>

        <div className="dashboard-hero-art">
          <div className="hero-art-sun" />
          <div className="hero-art-tag">SMART FARMING · REAL INSIGHTS</div>
          <FarmIllustration />
          <div className="hero-art-leaf leaf-one">✦</div>
          <div className="hero-art-leaf leaf-two">✧</div>
        </div>
      </div>

      <div className="dashboard-overview-intro">
        <div>
          <span className="dashboard-kicker">{t("quickLook")}</span>
          <h2 className="dashboard-section-title">{t("farmAtGlance")}</h2>
        </div>
        <span className="dashboard-live-label">
          <span /> {t("profileConnected")}
        </span>
      </div>

      <div className="dashboard-stat-grid">
        <div className="dashboard-stat-card stat-green">
          <div className="dashboard-stat-top">
            <span>{t("registeredFields")}</span>
            <span className="dashboard-stat-icon">▧</span>
          </div>
          <h2>{fields.length}</h2>
          <p>{t("fieldsInProfile")}</p>
          <div className="dashboard-stat-decoration">🌱</div>
        </div>

        <div className="dashboard-stat-card stat-yellow">
          <div className="dashboard-stat-top">
            <span>{t("totalFarmArea")}</span>
            <span className="dashboard-stat-icon">⌖</span>
          </div>
          <h2>{totalArea.toFixed(2)}</h2>
          <p>{t("registeredAreaUnit")}</p>
          <div className="dashboard-stat-decoration">🌾</div>
        </div>

        <div className="dashboard-stat-card stat-lilac">
          <div className="dashboard-stat-top">
            <span>{t("locationsMapped")}</span>
            <span className="dashboard-stat-icon">⌖</span>
          </div>
          <h2>{locations.length}</h2>
          <p>{t("savedLocations")}</p>
          <div className="dashboard-stat-decoration">🗺️</div>
        </div>
      </div>

      <div className="dashboard-section-row">
        <div>
          <span className="dashboard-kicker">{t("skyToSoil")}</span>
          <h2 className="dashboard-section-title">{t("farmIntelligence")}</h2>
          <p className="dashboard-section-description">
            {t("intelligenceDescription")}
          </p>
        </div>
        <span className="dashboard-coming-label">{t("yourWorkspace")}</span>
      </div>

      <div className="dashboard-intelligence-grid">
        <button
          className="intelligence-card satellite-card"
          onClick={() => openSection("Satellite Field Health")}
        >
          <div className="intelligence-card-art">
            <SatelliteIllustration />
            <span className="art-orbit orbit-one" />
            <span className="art-orbit orbit-two" />
          </div>
          <div className="intelligence-card-body">
            <span className="intelligence-number">01 · {t("fromSky")}</span>
            <h3>{t("satelliteHealth")}</h3>
            <p>{t("sentinelDescription")}</p>
            <strong>{t("exploreSatellite")} →</strong>
          </div>
        </button>

        <button
          className="intelligence-card crop-card"
          onClick={() => openSection("Crop Image Analysis")}
        >
          <div className="intelligence-card-art">
            <PlantIllustration />
            <span className="art-sparkle">✦</span>
          </div>
          <div className="intelligence-card-body">
            <span className="intelligence-number">02 · {t("fromField")}</span>
            <h3>{t("cropAnalysis")}</h3>
            <p>{t("uploadCropPhotos")}</p>
            <strong>{t("exploreImageAnalysis")} →</strong>
          </div>
        </button>

        <button
          className="intelligence-card ai-card"
          onClick={() => openSection("AI Diagnosis")}
        >
          <div className="intelligence-card-art">
            <AiIllustration />
            <span className="ai-art-sparkle">✧</span>
          </div>
          <div className="intelligence-card-body">
            <span className="intelligence-number">03 · {t("intelligence")}</span>
            <h3>{t("aiDiagnosis")}</h3>
            <p>{t("diagnosisDescription")}</p>
            <strong>{t("exploreDiagnosis")} →</strong>
          </div>
        </button>

        <button
          className="intelligence-card analytics-card"
          onClick={() => openSection("Analytics & Recommendations")}
        >
          <div className="intelligence-card-art analytics-art">
            <div className="analytics-art-bars">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="analytics-art-line">↗</div>
          </div>
          <div className="intelligence-card-body">
            <span className="intelligence-number">04 · {t("learnImprove")}</span>
            <h3>{t("analytics")}</h3>
            <p>{t("analyticsDescription")}</p>
            <strong>{t("exploreAnalytics")} →</strong>
          </div>
        </button>
      </div>

      <div className="dashboard-lower-grid">
        <div className="dashboard-field-card">
          <div className="dashboard-panel-heading">
            <div>
              <span className="dashboard-kicker">{t("registeredCrops")}</span>
              <h3>{t("growingOnFarm")}</h3>
            </div>
            <button onClick={() => openSection("Collected Data")}>
              {t("viewAll")} →
            </button>
          </div>

          {fields.length > 0 ? (
            <div className="dashboard-crop-list">
              {fields.slice(0, 3).map((field, index) => (
                <div className="dashboard-crop-item" key={field._id}>
                  <div className={`crop-emoji crop-emoji-${index % 3}`}>
                    {["🌾", "🌱", "🥬"][index % 3]}
                  </div>
                  <div className="dashboard-crop-info">
                    <strong>{field.cropName}</strong>
                    <span>
                      {field.fieldName} · {field.area} {t("areaUnits")}
                    </span>
                  </div>
                  <span className="crop-item-arrow">↗</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="dashboard-empty-state">
              <PlantIllustration />
              <p>{t("noCropInfo")}</p>
            </div>
          )}
        </div>

        <div className="dashboard-temporal-card">
          <div className="temporal-card-art">
            <div className="temporal-sun">☀</div>
            <div className="temporal-plant temporal-plant-old">🌱</div>
            <div className="temporal-arrow">→</div>
            <div className="temporal-plant temporal-plant-new">🌿</div>
          </div>
          <span className="dashboard-kicker">{t("thenNow")}</span>
          <h3>{t("temporalTitle")}</h3>
          <p>{t("temporalDescription")}</p>
          <button onClick={() => openSection("Temporal Analysis")}>
            {t("exploreTemporal")} →
          </button>
        </div>
      </div>

      <div className="dashboard-ground-note">
        <div className="ground-note-icon">⌁</div>
        <div>
          <strong>{t("sensorConnection")}</strong>
          <p>{t("sensorDescription")}</p>
        </div>
        <button onClick={() => navigate("/onboarding/sensors")}>
          {t("sensorSetup")} →
        </button>
      </div>
    </>
  );

  const renderCollectedData = () => (
    <section className="dashboard-section">
      <SectionHeading
        eyebrow="YOUR FARM RECORDS"
        title="Collected Data"
        description="All the information you registered during onboarding, organised in one place."
      />

      <div className="dashboard-data-actions">
        <button onClick={() => navigate("/onboarding/farmer")}>Edit farmer information ↗</button>
        <button onClick={() => navigate("/onboarding/field")}>Manage fields ↗</button>
        <button onClick={() => navigate("/onboarding/location")}>Manage locations ↗</button>
      </div>

      <div className="dashboard-record-card">
        <div className="dashboard-record-heading">
          <span className="record-icon">♙</span>
          <div>
            <h3>Farmer Information</h3>
            <p>Your personal and farming profile</p>
          </div>
        </div>
        {farmer ? (
          <div className="dashboard-record-grid">
            <p><span>Full name</span><strong>{farmer.fullName}</strong></p>
            <p><span>Phone</span><strong>{farmer.phone}</strong></p>
            <p><span>Email</span><strong>{farmer.email || "Not provided"}</strong></p>
            <p><span>Age</span><strong>{farmer.age ?? "Not provided"}</strong></p>
            <p><span>Gender</span><strong>{formatLabel(farmer.gender)}</strong></p>
            <p><span>Experience</span><strong>{farmer.experience ? `${farmer.experience} years` : "Not provided"}</strong></p>
            <p><span>Farming type</span><strong>{formatLabel(farmer.farmingType)}</strong></p>
            <p><span>Address</span><strong>{farmer.address || "Not provided"}</strong></p>
            <p><span>Profile created</span><strong>{formatDate(farmer.createdAt)}</strong></p>
          </div>
        ) : (
          <div className="dashboard-empty-state">No farmer profile found.</div>
        )}
      </div>

      <div className="dashboard-record-card">
        <div className="dashboard-record-heading">
          <span className="record-icon">🌱</span>
          <div>
            <h3>Field Information</h3>
            <p>{fields.length} registered field(s)</p>
          </div>
        </div>

        {fields.length > 0 ? fields.map((field) => (
          <div className="dashboard-record-entry" key={field._id}>
            <h4>{field.fieldName}</h4>
            <div className="dashboard-record-grid">
              <p><span>Crop</span><strong>{field.cropName}</strong></p>
              <p><span>Variety</span><strong>{field.cropVariety || "Not specified"}</strong></p>
              <p><span>Area</span><strong>{field.area}</strong></p>
              <p><span>Soil type</span><strong>{formatLabel(field.soilType)}</strong></p>
              <p><span>Irrigation</span><strong>{formatLabel(field.irrigationMethod)}</strong></p>
              <p><span>Sowing date</span><strong>{formatDate(field.sowingDate)}</strong></p>
              <p><span>Season</span><strong>{formatLabel(field.farmingSeason)}</strong></p>
              <p><span>Cultivation details</span><strong>{field.cultivationDetails || "Not provided"}</strong></p>
            </div>
          </div>
        )) : (
          <div className="dashboard-empty-state">No fields registered yet.</div>
        )}
      </div>

      <div className="dashboard-record-card">
        <div className="dashboard-record-heading">
          <span className="record-icon">⌖</span>
          <div>
            <h3>Location & Boundary Information</h3>
            <p>{locations.length} saved farm location(s)</p>
          </div>
        </div>

        {locations.length > 0 ? locations.map((location) => {
          const coordinates = location.boundary?.coordinates?.[0] || [];
          const fieldName = typeof location.fieldId === "object"
            ? location.fieldId?.fieldName
            : "Registered field";

          return (
            <div className="dashboard-record-entry" key={location._id}>
              <h4>{fieldName || "Farm location"}</h4>
              <div className="dashboard-record-grid">
                <p><span>Village</span><strong>{location.village}</strong></p>
                <p><span>Taluka</span><strong>{location.taluka}</strong></p>
                <p><span>District</span><strong>{location.district}</strong></p>
                <p><span>State</span><strong>{location.state}</strong></p>
                <p><span>Pincode</span><strong>{location.pincode}</strong></p>
                <p><span>Latitude</span><strong>{location.latitude}</strong></p>
                <p><span>Longitude</span><strong>{location.longitude}</strong></p>
                <p><span>Boundary area</span><strong>{location.boundaryArea ?? "Not calculated"}</strong></p>
                <p><span>Boundary points</span><strong>{coordinates.length}</strong></p>
              </div>
              <span className="dashboard-record-status">
                {coordinates.length >= 4 ? "✓ Boundary polygon saved" : "Boundary unavailable"}
              </span>
            </div>
          );
        }) : (
          <div className="dashboard-empty-state">No locations registered yet.</div>
        )}
      </div>
    </section>
  );

  const renderModulePlaceholder = (title, eyebrow, description, illustration) => (
    <section className="dashboard-section">
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
      />
      <div className="dashboard-module-placeholder">
        <div className="module-placeholder-art">{illustration}</div>
        <div className="module-placeholder-copy">
          <span className="dashboard-coming-label">MODULE IN DEVELOPMENT</span>
          <h2>Something thoughtful is growing here.</h2>
          <p>
            This module will be connected to your registered farm data
            as we build the DHARA-AI intelligence pipeline.
          </p>
          <button onClick={() => openSection("Overview")}>
            Back to overview →
          </button>
        </div>
      </div>
    </section>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div className="dashboard-loading-screen">
          <div className="loading-plant">🌱</div>
          <h2>Preparing your farm workspace</h2>
          <p>Gathering your farm information...</p>
          <div className="loading-track"><span /></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="dashboard-error-screen">
          <span>🌿</span>
          <h2>We couldn't load your farm data.</h2>
          <p>{error}</p>
          <button className="dashboard-primary-button" onClick={fetchDashboardData}>
            Try again ↻
          </button>
        </div>
      );
    }

    switch (activeSection) {
      case "Overview":
        return renderOverview();

      case "Satellite Field Health":
        return <SatelliteFieldHealth />;

      case "Crop Image Analysis":
        return (
          <CropImageAnalysis
            fields={fields}
            locations={locations}
            onPrediction={setCropPrediction}
          />
        );

      case "AI Diagnosis":
        return (
          <AIDiagnosis
            farmer={farmer}
            fields={fields}
            locations={locations}
            prediction={cropPrediction}
          />
        );

      case "Analytics & Recommendations":
  return (
    <AnalyticsRecommendations
      farmer={farmer}
      fields={fields}
      locations={locations}
      prediction={cropPrediction}
    />
  );

      case "Temporal Analysis":
  return (
    <TemporalAnalysis
      farmer={farmer}
      fields={fields}
      locations={locations}
    />
  );

      case "Collected Data":
        return renderCollectedData();

      case "Settings":
        return (
          <section className="dashboard-section">
            <SectionHeading
              eyebrow="YOUR ACCOUNT"
              title={t("settings")}
              description="Manage your DHARA-AI account and workspace."
            />
            <div className="dashboard-record-card">
              <div className="dashboard-record-heading">
                <span className="record-icon">⚙</span>
                <div>
                  <h3>Account Information</h3>
                  <p>Your signed-in account</p>
                </div>
              </div>
              <div className="dashboard-record-grid">
                <p><span>Name</span><strong>{displayName}</strong></p>
                <p><span>Email</span><strong>{user?.email || farmer?.email || "Not available"}</strong></p>
              </div>
              <button className="dashboard-danger-button" onClick={onLogout}>
                {t("logout")} from DHARA-AI ↗
              </button>
            </div>
          </section>
        );

      default:
        return renderOverview();
    }
  };

  const groups = [...new Set(navigation.map((item) => item.group))];

  const activeNavigationKey =
    navigation.find((item) => item.name === activeSection)?.key || "overview";

  const groupTranslationKeys = {
    "MAIN WORKSPACE": "mainWorkspace",
    INSIGHTS: "insights",
    MANAGEMENT: "management",
  };

  return (
    <main className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="dashboard-sidebar-brand">
          <Logo small />
          <span>INTELLIGENCE FROM SKY TO SEED</span>
        </div>

        <div className="dashboard-sidebar-navigation">
          {groups.map((group) => (
            <div key={group}>
              <div className="dashboard-sidebar-label">
                {t(groupTranslationKeys[group])}
              </div>

              <nav className="dashboard-navigation">
                {navigation
                  .filter((item) => item.group === group)
                  .map((item) => (
                    <button
                      key={item.name}
                      className={`dashboard-nav-item ${
                        activeSection === item.name ? "active" : ""
                      }`}
                      onClick={() => setActiveSection(item.name)}
                    >
                      <span className="dashboard-nav-icon">{item.icon}</span>
                      <span>{t(item.key)}</span>
                      {activeSection === item.name && (
                        <span className="nav-active-dot" />
                      )}
                    </button>
                  ))}
              </nav>
            </div>
          ))}
        </div>

        <div className="dashboard-sidebar-bottom">
          <div className="dashboard-sidebar-user">
            <div className="dashboard-avatar">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div>
              <strong>{displayName}</strong>
              <span>{t("workspace")}</span>
            </div>
          </div>

          <button
            className="dashboard-nav-item dashboard-logout"
            onClick={onLogout}
          >
            <span className="dashboard-nav-icon">↪</span>
            {t("logout")}
          </button>

          <div className="dashboard-sidebar-footer">DHARA-AI © 2026</div>
        </div>
      </aside>

      <section className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="dashboard-breadcrumb">
            <span>DHARA-AI</span>
            <span className="breadcrumb-divider">/</span>
            <strong>{t(activeNavigationKey)}</strong>
          </div>

          <div className="dashboard-topbar-actions">
            <span className="dashboard-sync-indicator">
              <span />
              {loading ? t("syncing") : t("workspaceReady")}
            </span>

            <div className="dashboard-language-selector">
              <span>🌐</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                aria-label="Select language"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="mr">मराठी</option>
              </select>
            </div>

            <button
              className="dashboard-refresh-button"
              type="button"
              onClick={fetchDashboardData}
              disabled={loading}
              title={t("refresh")}
            >
              ↻ <span>{t("refresh")}</span>
            </button>
          </div>
        </header>

        <div className="dashboard-page-content">
          {renderContent()}

          {lastUpdated && !loading && !error && (
            <p className="dashboard-last-updated">
              {t("lastSynced")} {lastUpdated.toLocaleTimeString("en-IN")}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
