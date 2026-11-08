
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import "./SatelliteFieldHealth.css";

import {
  MapContainer,
  TileLayer,
  GeoJSON,
  ImageOverlay,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000/api/auth"
).replace(/\/auth\/?$/, "");

// Translations for Satellite Field Health.
const translations = {
  en: {
    loadingTitle: "Loading your farms...",
    loadingDescription: "Retrieving your saved field and location information.",
    kicker: "DHARA INTELLIGENCE / SATELLITE",
    title: "Satellite",
    titleEmphasis: "Field Health",
    subtitle: "Monitor your farmland through satellite imagery and vegetation-health analysis.",
    monitoring: "Satellite monitoring",
    noFarms: "No saved farms found",
    noFarmsDescription: "Complete your Field Information setup before using Satellite Field Health.",
    yourFarms: "Your farms",
    selectFarm: "Select a farm to explore its geographical boundary.",
    registeredFields: "registered fields",
    selected: "SELECTED",
    hectares: "hectares",
    locationNotAdded: "Location not added",
    boundaryLoaded: "Farm boundary loaded",
    boundaryUnavailable: "Boundary unavailable",
    noBoundary: "No farm boundary available",
    noBoundaryDescription: "Complete the location setup and draw your farm boundary to display it here.",
    village: "VILLAGE",
    district: "DISTRICT",
    state: "STATE",
    boundaryArea: "BOUNDARY AREA",
    vegetationAnalysis: "Vegetation Health Analysis",
    vegetationDescription: "Satellite imagery processed using Band 8 (Near Infrared) and Band 4 (Red). The colour-coded image represents NDVI ranges across your selected farm.",
    processing: "Processing satellite data",
    imageLoaded: "Satellite image loaded",
    imageUnavailable: "Image unavailable",
    satelliteMap: "Satellite NDVI Map",
    processingTitle: "Processing satellite imagery...",
    processingDescription: "Retrieving and analysing Sentinel-2 data for your selected farm.",
    belowZero: "Below 0",
    aboveEight: "Above 0.8",
    sessionExpired: "Session expired. Please sign in again.",
    loadFieldsError: "Unable to load saved fields.",
    loadLocationsError: "Unable to load farm locations.",
    loadFarmError: "Unable to load farm information.",
    boundaryRequired: "A valid farm boundary is required for satellite analysis.",
    generateImageError: "Unable to generate satellite imagery.",
    invalidImage: "Invalid image format received",
    emptyImage: "The satellite service returned an empty image.",
    decodeImageError: "The satellite service returned a PNG that the browser cannot decode.",
    loadImageError: "Unable to load satellite imagery.",
    displayImageError: "The satellite image was received but could not be displayed.",
    imageReadError: "Unable to read the satellite image.",
  },

  hi: {
    loadingTitle: "आपके खेत लोड हो रहे हैं...",
    loadingDescription: "आपके सहेजे गए खेत और स्थान की जानकारी प्राप्त की जा रही है।",
    kicker: "DHARA इंटेलिजेंस / सैटेलाइट",
    title: "सैटेलाइट",
    titleEmphasis: "खेत का स्वास्थ्य",
    subtitle: "सैटेलाइट तस्वीरों और वनस्पति स्वास्थ्य विश्लेषण से अपने खेत की निगरानी करें।",
    monitoring: "सैटेलाइट निगरानी",
    noFarms: "कोई सहेजा गया खेत नहीं मिला",
    noFarmsDescription: "सैटेलाइट फील्ड हेल्थ का उपयोग करने से पहले खेत की जानकारी पूरी करें।",
    yourFarms: "आपके खेत",
    selectFarm: "उसकी भौगोलिक सीमा देखने के लिए एक खेत चुनें।",
    registeredFields: "पंजीकृत खेत",
    selected: "चयनित",
    hectares: "हेक्टेयर",
    locationNotAdded: "स्थान नहीं जोड़ा गया",
    boundaryLoaded: "खेत की सीमा लोड हो गई",
    boundaryUnavailable: "खेत की सीमा उपलब्ध नहीं है",
    noBoundary: "खेत की सीमा उपलब्ध नहीं है",
    noBoundaryDescription: "स्थान सेटअप पूरा करें और खेत की सीमा बनाएं ताकि वह यहां दिखाई दे।",
    village: "गाँव",
    district: "जिला",
    state: "राज्य",
    boundaryArea: "सीमा का क्षेत्रफल",
    vegetationAnalysis: "वनस्पति स्वास्थ्य विश्लेषण",
    vegetationDescription: "बैंड 8 (नियर इन्फ्रारेड) और बैंड 4 (रेड) से सैटेलाइट तस्वीरों का विश्लेषण किया गया है। रंगीन तस्वीर आपके चुने हुए खेत में NDVI स्तर दिखाती है।",
    processing: "सैटेलाइट डेटा का विश्लेषण हो रहा है",
    imageLoaded: "सैटेलाइट तस्वीर लोड हो गई",
    imageUnavailable: "तस्वीर उपलब्ध नहीं है",
    satelliteMap: "सैटेलाइट NDVI मानचित्र",
    processingTitle: "सैटेलाइट तस्वीर का विश्लेषण हो रहा है...",
    processingDescription: "आपके चुने हुए खेत के लिए Sentinel-2 डेटा प्राप्त और विश्लेषित किया जा रहा है।",
    belowZero: "0 से कम",
    aboveEight: "0.8 से अधिक",
    sessionExpired: "आपका सत्र समाप्त हो गया है। कृपया दोबारा साइन इन करें।",
    loadFieldsError: "सहेजे गए खेत लोड नहीं हो सके।",
    loadLocationsError: "खेत के स्थान लोड नहीं हो सके।",
    loadFarmError: "खेत की जानकारी लोड नहीं हो सकी।",
    boundaryRequired: "सैटेलाइट विश्लेषण के लिए खेत की सही सीमा आवश्यक है।",
    generateImageError: "सैटेलाइट तस्वीर तैयार नहीं हो सकी।",
    invalidImage: "प्राप्त तस्वीर का फॉर्मेट सही नहीं है",
    emptyImage: "सैटेलाइट सेवा से खाली तस्वीर प्राप्त हुई।",
    decodeImageError: "सैटेलाइट सेवा से मिली PNG तस्वीर ब्राउज़र में नहीं खुल सकी।",
    loadImageError: "सैटेलाइट तस्वीर लोड नहीं हो सकी।",
    displayImageError: "सैटेलाइट तस्वीर प्राप्त हुई, लेकिन दिखाई नहीं जा सकी।",
    imageReadError: "सैटेलाइट तस्वीर पढ़ी नहीं जा सकी।",
  },

  mr: {
    loadingTitle: "तुमची शेते लोड होत आहेत...",
    loadingDescription: "तुमच्या जतन केलेल्या शेतांची आणि ठिकाणांची माहिती मिळवली जात आहे.",
    kicker: "DHARA इंटेलिजन्स / उपग्रह",
    title: "उपग्रह",
    titleEmphasis: "शेताचे आरोग्य",
    subtitle: "उपग्रह प्रतिमा आणि वनस्पती आरोग्य विश्लेषणाद्वारे तुमच्या शेतावर लक्ष ठेवा.",
    monitoring: "उपग्रह निरीक्षण",
    noFarms: "जतन केलेली शेते आढळली नाहीत",
    noFarmsDescription: "Satellite Field Health वापरण्यापूर्वी शेताची माहिती पूर्ण करा.",
    yourFarms: "तुमची शेते",
    selectFarm: "भौगोलिक सीमा पाहण्यासाठी एक शेत निवडा.",
    registeredFields: "नोंदणीकृत शेते",
    selected: "निवडलेले",
    hectares: "हेक्टर",
    locationNotAdded: "ठिकाण जोडलेले नाही",
    boundaryLoaded: "शेताची सीमा लोड झाली",
    boundaryUnavailable: "शेताची सीमा उपलब्ध नाही",
    noBoundary: "शेताची सीमा उपलब्ध नाही",
    noBoundaryDescription: "ठिकाणाची माहिती पूर्ण करा आणि शेताची सीमा तयार करा. ती येथे दिसेल.",
    village: "गाव",
    district: "जिल्हा",
    state: "राज्य",
    boundaryArea: "सीमेचे क्षेत्रफळ",
    vegetationAnalysis: "वनस्पती आरोग्य विश्लेषण",
    vegetationDescription: "बँड 8 (नियर इन्फ्रारेड) आणि बँड 4 (रेड) वापरून उपग्रह प्रतिमांचे विश्लेषण केले जाते. रंगीत प्रतिमा तुमच्या निवडलेल्या शेतातील NDVI स्तर दर्शवते.",
    processing: "उपग्रह डेटाचे विश्लेषण सुरू आहे",
    imageLoaded: "उपग्रह प्रतिमा लोड झाली",
    imageUnavailable: "प्रतिमा उपलब्ध नाही",
    satelliteMap: "उपग्रह NDVI नकाशा",
    processingTitle: "उपग्रह प्रतिमेचे विश्लेषण सुरू आहे...",
    processingDescription: "तुमच्या निवडलेल्या शेतासाठी Sentinel-2 डेटा मिळवला आणि विश्लेषित केला जात आहे.",
    belowZero: "0 पेक्षा कमी",
    aboveEight: "0.8 पेक्षा जास्त",
    sessionExpired: "तुमचे सत्र संपले आहे. कृपया पुन्हा साइन इन करा.",
    loadFieldsError: "जतन केलेली शेते लोड करता आली नाहीत.",
    loadLocationsError: "शेतांची ठिकाणे लोड करता आली नाहीत.",
    loadFarmError: "शेताची माहिती लोड करता आली नाही.",
    boundaryRequired: "उपग्रह विश्लेषणासाठी शेताची योग्य सीमा आवश्यक आहे.",
    generateImageError: "उपग्रह प्रतिमा तयार करता आली नाही.",
    invalidImage: "मिळालेल्या प्रतिमेचे स्वरूप चुकीचे आहे",
    emptyImage: "उपग्रह सेवेकडून रिकामी प्रतिमा मिळाली.",
    decodeImageError: "उपग्रह सेवेकडून मिळालेली PNG प्रतिमा ब्राउझरमध्ये उघडता आली नाही.",
    loadImageError: "उपग्रह प्रतिमा लोड करता आली नाही.",
    displayImageError: "उपग्रह प्रतिमा मिळाली, परंतु ती प्रदर्शित करता आली नाही.",
    imageReadError: "उपग्रह प्रतिमा वाचता आली नाही.",
  },
};

// Convert image Blob into a Base64 Data URL.
function blobToDataURL(blob, imageReadError) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error(imageReadError));

    reader.readAsDataURL(blob);
  });
}

// Automatically fit the map to the saved farm boundary.
function MapBounds({ boundary }) {
  const map = useMap();

  useEffect(() => {
    if (!boundary?.coordinates?.[0]?.length) return;

    const coordinates = boundary.coordinates[0];

    const bounds = coordinates.map(([longitude, latitude]) => [
      latitude,
      longitude,
    ]);

    map.fitBounds(bounds, {
      padding: [40, 40],
      maxZoom: 17,
    });
  }, [boundary, map]);

  return null;
}

function SatelliteFieldHealth() {
  const { language } = useLanguage();

  const t = (key) =>
    translations[language]?.[key] || translations.en[key] || key;

  const [fields, setFields] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedFieldId, setSelectedFieldId] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [ndviImage, setNdviImage] = useState("");
  const [ndviLoading, setNdviLoading] = useState(false);
  const [ndviError, setNdviError] = useState("");

  // Fetch saved farm and location information.
  useEffect(() => {
    const controller = new AbortController();

    const fetchFarmData = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("dhara_token");

        if (!token) {
          throw new Error(t("sessionExpired"));
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [fieldResponse, locationResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/field`, {
            headers,
            signal: controller.signal,
          }),
          fetch(`${API_BASE_URL}/location`, {
            headers,
            signal: controller.signal,
          }),
        ]);

        const fieldData = await fieldResponse.json();
        const locationData = await locationResponse.json();

        if (!fieldResponse.ok) {
          throw new Error(
            fieldData.message || t("loadFieldsError")
          );
        }

        if (!locationResponse.ok) {
          throw new Error(
            locationData.message || t("loadLocationsError")
          );
        }

        const savedFields = fieldData.fields || [];
        const savedLocations = locationData.locations || [];

        if (controller.signal.aborted) return;

        setFields(savedFields);
        setLocations(savedLocations);

        if (savedFields.length > 0) {
          setSelectedFieldId(savedFields[0]._id);
        }
      } catch (err) {
        if (err.name === "AbortError") return;

        console.error("Farm Data Error:", err);

        setError(
          err.message || t("loadFarmError")
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchFarmData();

    return () => controller.abort();
  }, []);

  // Get currently selected field.
  const selectedField = useMemo(
    () => fields.find((field) => field._id === selectedFieldId),
    [fields, selectedFieldId]
  );

  // Find location associated with selected field.
  const selectedLocation = useMemo(
    () =>
      locations.find((location) => {
        const locationFieldId =
          typeof location.fieldId === "object"
            ? location.fieldId?._id
            : location.fieldId;

        return locationFieldId === selectedFieldId;
      }),
    [locations, selectedFieldId]
  );

  const boundary = selectedLocation?.boundary;

  // Calculate geographical bounds for the NDVI satellite image.
  const ndviBounds = useMemo(() => {
    const coordinates = boundary?.coordinates?.[0];

    if (!coordinates?.length) return null;

    const longitudes = coordinates.map(([longitude]) => longitude);
    const latitudes = coordinates.map(([, latitude]) => latitude);

    const west = Math.min(...longitudes);
    const east = Math.max(...longitudes);
    const south = Math.min(...latitudes);
    const north = Math.max(...latitudes);

    return [
      [south, west],
      [north, east],
    ];
  }, [boundary]);

  // Calculate map center from polygon coordinates.
  const mapCenter = useMemo(() => {
    const coordinates = boundary?.coordinates?.[0];

    if (!coordinates?.length) {
      return [
        Number(selectedLocation?.latitude) || 20.5937,
        Number(selectedLocation?.longitude) || 78.9629,
      ];
    }

    const longitude = coordinates.reduce(
      (total, point) => total + point[0],
      0
    );

    const latitude = coordinates.reduce(
      (total, point) => total + point[1],
      0
    );

    return [
      latitude / coordinates.length,
      longitude / coordinates.length,
    ];
  }, [boundary, selectedLocation]);

  // Fetch and validate actual Sentinel-2 NDVI imagery.
  useEffect(() => {
    if (!selectedFieldId) return;

    const controller = new AbortController();

    const fetchNDVIImage = async () => {
      try {
        setNdviImage("");
        setNdviError("");

        if (
          boundary?.type !== "Polygon" ||
          !boundary?.coordinates?.[0]?.length
        ) {
          setNdviError(t("boundaryRequired"));
          return;
        }

        const token = localStorage.getItem("dhara_token");

        if (!token) {
          throw new Error(t("sessionExpired"));
        }

        setNdviLoading(true);

        const response = await fetch(
          `${API_BASE_URL}/ndvi/${selectedFieldId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          let message = t("generateImageError");

          try {
            const errorData = await response.json();
            message = errorData.message || message;
          } catch {
            // Keep default error message.
          }

          throw new Error(message);
        }

        // Read the returned image.
        const imageBlob = await response.blob();

        if (imageBlob.type !== "image/png") {
          throw new Error(
            `${t("invalidImage")}: ${imageBlob.type || "unknown"}`
          );
        }

        if (imageBlob.size === 0) {
          throw new Error(t("emptyImage"));
        }

        // Verify that the returned PNG can actually be decoded.
        let bitmap;

        try {
          bitmap = await createImageBitmap(imageBlob);

          console.log("NDVI IMAGE DECODED SUCCESSFULLY");
          console.log("IMAGE DIMENSIONS:", bitmap.width, "x", bitmap.height);
        } catch (decodeError) {
          console.error("NDVI PNG DECODE ERROR:", decodeError);

          throw new Error(t("decodeImageError"));
        } finally {
          bitmap?.close();
        }

        if (controller.signal.aborted) return;

        // Convert PNG Blob into a Base64 Data URL.
        const imageDataURL = await blobToDataURL(
          imageBlob,
          t("imageReadError")
        );

        if (controller.signal.aborted) return;

        setNdviImage(imageDataURL);
      } catch (err) {
        if (err.name === "AbortError") return;

        console.error("NDVI Image Error:", err);

        setNdviError(
          err.message || t("loadImageError")
        );
      } finally {
        if (!controller.signal.aborted) {
          setNdviLoading(false);
        }
      }
    };

    fetchNDVIImage();

    return () => controller.abort();
  }, [selectedFieldId, boundary, language]);

  if (loading) {
    return (
      <section className="satellite-page">
        <div className="satellite-loading">
          <div className="satellite-loader" />
          <h2>{t("loadingTitle")}</h2>
          <p>{t("loadingDescription")}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="satellite-page">
      {/* Page Heading */}
      <div className="satellite-heading">
        <div>
          <span className="satellite-kicker">
            {t("kicker")}
          </span>

          <h1>
            {t("title")} <em>{t("titleEmphasis")}</em>
          </h1>

          <p>{t("subtitle")}</p>
        </div>

        <div className="satellite-status">
          <span />
          {t("monitoring")}
        </div>
      </div>

      {error && (
        <div className="satellite-error" role="alert">
          {error}
        </div>
      )}

      {!error && fields.length === 0 && (
        <div className="satellite-empty">
          <h2>{t("noFarms")}</h2>
          <p>{t("noFarmsDescription")}</p>
        </div>
      )}

      {fields.length > 0 && (
        <>
          {/* Farm Selection */}
          <div className="satellite-section-heading">
            <div>
              <h2>{t("yourFarms")}</h2>
              <p>{t("selectFarm")}</p>
            </div>

            <span>
              {fields.length} {t("registeredFields")}
            </span>
          </div>

          <div className="satellite-field-grid">
            {fields.map((field) => {
              const isSelected = field._id === selectedFieldId;

              const location = locations.find((item) => {
                const id =
                  typeof item.fieldId === "object"
                    ? item.fieldId?._id
                    : item.fieldId;

                return id === field._id;
              });

              return (
                <button
                  type="button"
                  key={field._id}
                  className={`satellite-field-card ${
                    isSelected ? "selected" : ""
                  }`}
                  onClick={() => setSelectedFieldId(field._id)}
                >
                  <div className="satellite-card-top">
                    <span className="satellite-field-icon">⌁</span>

                    {isSelected && (
                      <span className="satellite-selected-label">
                        {t("selected")}
                      </span>
                    )}
                  </div>

                  <h3>{field.fieldName}</h3>
                  <p>{field.cropName}</p>

                  <div className="satellite-card-details">
                    <span>
                      <strong>{field.area}</strong> {t("hectares")}
                    </span>

                    <span>
                      {location?.district || t("locationNotAdded")}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {selectedField && (
            <>
              {/* Selected Farm */}
              <div className="satellite-section-heading map-heading">
                <div>
                  <h2>{selectedField.fieldName}</h2>
                  <p>
                    {selectedField.cropName} · {selectedField.area} {t("hectares")}
                  </p>
                </div>

                <span>
                  {boundary
                    ? t("boundaryLoaded")
                    : t("boundaryUnavailable")}
                </span>
              </div>

              {/* Farm Map */}
              <div className="satellite-map-card">
                {boundary?.type === "Polygon" &&
                boundary?.coordinates?.[0]?.length >= 4 ? (
                  <MapContainer
                    key={`${selectedFieldId}-${JSON.stringify(boundary)}`}
                    center={mapCenter}
                    zoom={15}
                    scrollWheelZoom
                    style={{
                      height: "460px",
                      width: "100%",
                      borderRadius: "16px",
                    }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {ndviImage && ndviBounds && (
                      <ImageOverlay
                        url={ndviImage}
                        bounds={ndviBounds}
                        opacity={0.85}
                        zIndex={2}
                        interactive={false}
                      />
                    )}

                    <GeoJSON
                      data={{
                        type: "Feature",
                        properties: {},
                        geometry: boundary,
                      }}
                      style={{
                        color: "#267d45",
                        weight: 3,
                        fillColor: "#68c982",
                        fillOpacity: 0.3,
                      }}
                    />

                    <MapBounds boundary={boundary} />
                  </MapContainer>
                ) : (
                  <div className="satellite-no-boundary">
                    <span>⌖</span>
                    <h3>{t("noBoundary")}</h3>
                    <p>{t("noBoundaryDescription")}</p>
                  </div>
                )}
              </div>

              {/* Location Details */}
              {selectedLocation && (
                <div className="satellite-location-details">
                  <div>
                    <span>{t("village")}</span>
                    <strong>
                      {selectedLocation.village || "--"}
                    </strong>
                  </div>

                  <div>
                    <span>{t("district")}</span>
                    <strong>
                      {selectedLocation.district || "--"}
                    </strong>
                  </div>

                  <div>
                    <span>{t("state")}</span>
                    <strong>
                      {selectedLocation.state || "--"}
                    </strong>
                  </div>

                  <div>
                    <span>{t("boundaryArea")}</span>
                    <strong>
                      {selectedLocation.boundaryArea ?? "--"} {t("hectares")}
                    </strong>
                  </div>
                </div>
              )}

              {/* NDVI Analysis Heading */}
              <div className="satellite-analysis-card">
                <div>
                  <span className="satellite-kicker">
                    SENTINEL-2 / VEGETATION INDEX
                  </span>

                  <h2>{t("vegetationAnalysis")}</h2>

                  <p>{t("vegetationDescription")}</p>
                </div>

                <div className="satellite-analysis-status">
                  <span>NDVI</span>

                  <strong>
                    {ndviLoading
                      ? "..."
                      : ndviImage
                      ? "READY"
                      : "--"}
                  </strong>

                  <small>
                    {ndviLoading
                      ? t("processing")
                      : ndviImage
                      ? t("imageLoaded")
                      : t("imageUnavailable")}
                  </small>
                </div>
              </div>

              {/* Actual Sentinel-2 NDVI Image */}
              <div className="satellite-ndvi-container">
                <div className="satellite-ndvi-heading">
                  <div>
                    <h3>{t("satelliteMap")}</h3>
                    <p>
                      {selectedField.fieldName} · Sentinel-2 L2A
                    </p>
                  </div>
                </div>

                {ndviLoading && (
                  <div className="satellite-ndvi-loading">
                    <div className="satellite-loader" />

                    <h3>{t("processingTitle")}</h3>

                    <p>{t("processingDescription")}</p>
                  </div>
                )}

                {ndviError && !ndviLoading && (
                  <div className="satellite-error" role="alert">
                    {ndviError}
                  </div>
                )}

                {ndviImage && !ndviLoading && (
                  <img
                    className="satellite-ndvi-image"
                    src={ndviImage}
                    alt={`Sentinel-2 NDVI vegetation health map for ${selectedField.fieldName}`}
                    onError={() => {
                      console.error("NDVI IMAGE ELEMENT FAILED TO RENDER");
                      setNdviImage("");
                      setNdviError(t("displayImageError"));
                    }}
                    onLoad={() => {
                      console.log("NDVI IMAGE DISPLAYED SUCCESSFULLY");
                    }}
                  />
                )}

                {/* NDVI Legend */}
                <div className="satellite-ndvi-legend">
                  <span>
                    <i style={{ background: "#a50026" }} />
                    {t("belowZero")}
                  </span>

                  <span>
                    <i style={{ background: "#d73027" }} />
                    0–0.2
                  </span>

                  <span>
                    <i style={{ background: "#fc8d59" }} />
                    0.2–0.4
                  </span>

                  <span>
                    <i style={{ background: "#d9ef8b" }} />
                    0.4–0.6
                  </span>

                  <span>
                    <i style={{ background: "#66bd63" }} />
                    0.6–0.8
                  </span>

                  <span>
                    <i style={{ background: "#1a6637" }} />
                    {t("aboveEight")}
                  </span>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}

export default SatelliteFieldHealth;
