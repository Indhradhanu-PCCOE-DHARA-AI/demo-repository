
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000/api/auth"
).replace(/\/auth\/?$/, "");

function FieldInformation() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fieldName: "",
    cropName: "",
    cropVariety: "",
    fieldArea: "",
    areaUnit: "acre",
    sowingDate: "",
    soilType: "",
    irrigationType: "",
    farmingSeason: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const token = localStorage.getItem("dhara_token");

      if (!token) {
        setMessage("Your session has expired. Please sign in again.");
        setLoading(false);
        return;
      }

      // Convert all area units into acres for consistent storage.
      const conversionToAcres = {
        acre: 1,
        hectare: 2.47105,
        guntha: 0.025,
      };

      const areaInAcres =
        Number(formData.fieldArea) *
        conversionToAcres[formData.areaUnit];

      const payload = {
        fieldName: formData.fieldName.trim(),
        cropName: formData.cropName.trim(),
        cropVariety: formData.cropVariety.trim(),
        area: areaInAcres,
        soilType: formData.soilType,
        irrigationMethod: formData.irrigationType,
      };

      const response = await fetch(`${API_BASE_URL}/field`, {
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
          data.message || "Unable to save field information."
        );
      }

      setMessage("Field information saved successfully!");

      setTimeout(() => {
        navigate("/onboarding");
      }, 1000);
    } catch (error) {
      console.error("Field Information Error:", error);
      setMessage(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
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
          <span className="section-kicker">ONBOARDING / STEP 02</span>

          <h1>
            About your <em>field.</em>
          </h1>

          <p>
            Every field is different. Tell us about your land and the crops
            you're growing so DHARA can understand your agricultural needs.
          </p>

          <div className="form-step-indicator">
            <span className="active" />
            <span className="active" />
            <span />
            <small>STEP 2 OF 3</small>
          </div>
        </div>

        <form className="farmer-form" onSubmit={handleSubmit}>
          <div className="form-section-heading">
            <span>01</span>
            <div>
              <h2>Field details</h2>
              <p>Basic information about your agricultural land.</p>
            </div>
          </div>

          <div className="form-grid">
            <label>
              FIELD NAME *
              <input
                name="fieldName"
                value={formData.fieldName}
                onChange={handleChange}
                placeholder="e.g. North Field"
                required
              />
            </label>

            <label>
              TOTAL FIELD AREA *
              <div className="input-with-select">
                <input
                  name="fieldArea"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={formData.fieldArea}
                  onChange={handleChange}
                  placeholder="Enter land area"
                  required
                />

                <select
                  name="areaUnit"
                  value={formData.areaUnit}
                  onChange={handleChange}
                  aria-label="Area unit"
                >
                  <option value="acre">Acres</option>
                  <option value="hectare">Hectares</option>
                  <option value="guntha">Guntha</option>
                </select>
              </div>
            </label>

            <label>
              CROP NAME *
              <input
                name="cropName"
                value={formData.cropName}
                onChange={handleChange}
                placeholder="e.g. Wheat, Rice, Cotton"
                required
              />
            </label>

            <label>
              CROP VARIETY
              <input
                name="cropVariety"
                value={formData.cropVariety}
                onChange={handleChange}
                placeholder="Enter crop variety"
              />
            </label>

            <label>
              SOWING DATE
              <input
                name="sowingDate"
                type="date"
                value={formData.sowingDate}
                onChange={handleChange}
              />
            </label>

            <label>
              FARMING SEASON
              <select
                name="farmingSeason"
                value={formData.farmingSeason}
                onChange={handleChange}
              >
                <option value="">Select season</option>
                <option value="kharif">Kharif</option>
                <option value="rabi">Rabi</option>
                <option value="zaid">Zaid</option>
                <option value="year_round">Year-round</option>
              </select>
            </label>
          </div>

          <div className="form-section-heading second">
            <span>02</span>
            <div>
              <h2>Soil & irrigation</h2>
              <p>Understand the growing conditions of your field.</p>
            </div>
          </div>

          <div className="form-grid">
            <label>
              SOIL TYPE *
              <select
                name="soilType"
                value={formData.soilType}
                onChange={handleChange}
                required
              >
                <option value="">Select soil type</option>
                <option value="black">Black soil</option>
                <option value="red">Red soil</option>
                <option value="alluvial">Alluvial soil</option>
                <option value="sandy">Sandy soil</option>
                <option value="clay">Clay soil</option>
                <option value="loamy">Loamy soil</option>
                <option value="other">Other / Not sure</option>
              </select>
            </label>

            <label>
              IRRIGATION METHOD *
              <select
                name="irrigationType"
                value={formData.irrigationType}
                onChange={handleChange}
                required
              >
                <option value="">Select irrigation method</option>
                <option value="drip">Drip irrigation</option>
                <option value="sprinkler">Sprinkler irrigation</option>
                <option value="flood">Flood irrigation</option>
                <option value="rainfed">Rainfed</option>
                <option value="other">Other</option>
              </select>
            </label>
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
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="dark-button"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save field details"}
              {!loading && <span>↗</span>}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default FieldInformation;
