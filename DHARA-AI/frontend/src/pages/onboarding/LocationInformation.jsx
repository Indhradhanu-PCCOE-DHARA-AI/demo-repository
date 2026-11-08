
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import FarmMap from "../../components/FarmMap";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000/api/auth"
).replace(/\/auth\/?$/, "");

function LocationInformation() {
  const navigate = useNavigate();

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
          setMessage("Please sign in again to continue.");
          return;
        }

        const response = await fetch(`${API_BASE_URL}/field`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to fetch your fields.");
        }

        setFields(data.fields || []);

        if (data.fields?.length > 0) {
          setFormData((previous) => ({
            ...previous,
            fieldId: data.fields[0]._id,
          }));
        } else {
          setMessage(
            "No saved fields found. Please complete Field Information first."
          );
        }
      } catch (error) {
        console.error("Fetch Fields Error:", error);
        setMessage(error.message || "Unable to load your fields.");
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
      setMessage("Your browser does not support GPS location detection.");
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
        setMessage("GPS coordinates detected successfully.");
      },
      () => {
        setLocationLoading(false);
        setMessage(
          "Unable to detect location. Allow GPS access or enter coordinates manually."
        );
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
        throw new Error("Your session has expired. Please sign in again.");
      }

      if (!formData.fieldId) {
        throw new Error("Please select a field first.");
      }

      if (!boundaryData.boundary) {
        throw new Error(
          "Please draw your farm boundary on the map before saving."
        );
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
        throw new Error(
          data.message || "Unable to save farm location."
        );
      }

      setMessage("Farm location and boundary saved successfully!");

      setTimeout(() => {
        navigate("/onboarding/sensors");
      }, 1000);
    } catch (error) {
      console.error("Save Location Error:", error);
      setMessage(error.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="onboarding-form-page">
      <header className="onboarding-header">
        <Logo small />

        <button
          type="button"
          className="form-back-button"
          onClick={() => navigate("/onboarding")}
        >
          ← Back to setup
        </button>
      </header>

      <section className="form-container">
        <div className="form-intro">
          <span className="section-kicker">ONBOARDING / STEP 03</span>

          <h1>
            Where is your <em>farm?</em>
          </h1>

          <p>
            Help DHARA identify your farm's geographical location. This
            information will later be used for satellite imagery and field
            monitoring.
          </p>

          <div className="form-step-indicator">
            <span className="active" />
            <span className="active" />
            <span className="active" />
            <small>STEP 3 OF 3</small>
          </div>
        </div>

        <form className="farmer-form" onSubmit={handleSubmit}>
          <div className="form-section-heading">
            <span>01</span>
            <div>
              <h2>Select your field</h2>
              <p>Choose the field whose location you are adding.</p>
            </div>
          </div>

          <div className="form-grid">
            <label className="full-width">
              SAVED FIELD *
              <select
                name="fieldId"
                value={formData.fieldId}
                onChange={handleChange}
                required
                disabled={loadingFields || fields.length === 0}
              >
                {loadingFields && (
                  <option value="">Loading your fields...</option>
                )}

                {!loadingFields && fields.length === 0 && (
                  <option value="">No saved fields available</option>
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
              <h2>Farm address</h2>
              <p>Enter the administrative location of your farmland.</p>
            </div>
          </div>

          <div className="form-grid">
            <label>
              VILLAGE *
              <input
                name="village"
                value={formData.village}
                onChange={handleChange}
                placeholder="Enter village name"
                required
              />
            </label>

            <label>
              TALUKA / TEHSIL *
              <input
                name="taluka"
                value={formData.taluka}
                onChange={handleChange}
                placeholder="Enter taluka"
                required
              />
            </label>

            <label>
              DISTRICT *
              <input
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder="Enter district"
                required
              />
            </label>

            <label>
              STATE *
              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter state"
                required
              />
            </label>

            <label>
              PINCODE *
              <input
                name="pincode"
                type="text"
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength="6"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="6-digit pincode"
                required
              />
            </label>
          </div>

          <div className="form-section-heading second">
            <span>03</span>
            <div>
              <h2>Geographical coordinates</h2>
              <p>
                Detect your farm's GPS coordinates or enter them manually.
              </p>
            </div>
          </div>

          <div className="location-detect-panel">
            <div>
              <span className="location-icon">⌖</span>
              <div>
                <h3>Detect farm location</h3>
                <p>
                  Allow browser location access while you are at your farm.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="location-detect-button"
              onClick={detectLocation}
              disabled={locationLoading}
            >
              {locationLoading ? "Detecting..." : "Detect GPS location"}
            </button>
          </div>

          <div className="form-grid coordinate-grid">
            <label>
              LATITUDE *
              <input
                name="latitude"
                type="number"
                min="-90"
                max="90"
                step="any"
                value={formData.latitude}
                onChange={handleChange}
                placeholder="e.g. 18.520430"
                required
              />
            </label>

            <label>
              LONGITUDE *
              <input
                name="longitude"
                type="number"
                min="-180"
                max="180"
                step="any"
                value={formData.longitude}
                onChange={handleChange}
                placeholder="e.g. 73.856744"
                required
              />
            </label>
          </div>

          {/* Interactive farm boundary map */}
          <div className="form-section-heading second">
            <span>04</span>
            <div>
              <h2>Draw your farm boundary</h2>
              <p>
                Use the polygon drawing tool to mark the actual perimeter
                of your farmland.
              </p>
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
                    <strong>Farm boundary selected successfully.</strong>
                  </p>
                  <p>
                    Estimated mapped area:{" "}
                    <strong>
                      {boundaryData.boundaryArea} hectares
                    </strong>
                  </p>
                  <p>
                    <small>
                      You can edit or delete the polygon using the map tools.
                    </small>
                  </p>
                </>
              ) : (
                <p>
                  Draw a polygon around your farmland using the polygon tool
                  on the map. The area will be calculated automatically.
                </p>
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
              Cancel
            </button>

            <button
              type="submit"
              className="dark-button"
              disabled={saving || loadingFields || fields.length === 0}
            >
              {saving ? "Saving..." : "Save location"}
              {!saving && <span>↗</span>}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default LocationInformation;
