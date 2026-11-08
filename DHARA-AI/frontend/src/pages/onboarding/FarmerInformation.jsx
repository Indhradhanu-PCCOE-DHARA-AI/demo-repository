
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import "./FarmerInformation.css";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000/api/auth"
).replace(/\/auth\/?$/, "");

function FarmerInformation() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    age: "",
    gender: "",
    experience: "",
    farmingType: "",
    address: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("dhara_token");

    if (!token) {
      setMessage("Your session has expired. Please sign in again.");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/farmer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to save farmer information."
        );
      }

      setMessage("Farmer information saved successfully!");
      setMessageType("success");

    } catch (error) {
      console.error("Farmer Submission Error:", error);

      setMessage(
        error.message || "Something went wrong. Please try again."
      );
      setMessageType("error");

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="onboarding-form-page">

      <header className="onboarding-header">
        <Logo small />

        <button
          className="form-back-button"
          onClick={() => navigate("/onboarding")}
        >
          ← Back to setup
        </button>
      </header>

      <section className="form-container">

        <div className="form-intro">
          <span className="section-kicker">
            ONBOARDING / STEP 01
          </span>

          <h1>
            About <em>you.</em>
          </h1>

          <p>
            Let's start with the person behind the farm.
            Tell us a little about yourself and your
            farming background.
          </p>

          <div className="form-step-indicator">
            <span className="active" />
            <span />
            <span />
            <small>STEP 1 OF 3</small>
          </div>
        </div>

        <form className="farmer-form" onSubmit={handleSubmit}>

          <div className="form-section-heading">
            <span>01</span>
            <div>
              <h2>Personal information</h2>
              <p>Basic details to identify your farmer profile.</p>
            </div>
          </div>

          <div className="form-grid">

            <label>
              FULL NAME *
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                minLength={2}
                maxLength={100}
                required
              />
            </label>

            <label>
              PHONE NUMBER *
              <input
                name="phone"
                type="tel"
                inputMode="numeric"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                pattern="[0-9]{10}"
                maxLength={10}
                required
              />
            </label>

            <label>
              EMAIL ADDRESS
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </label>

            <label>
              AGE
              <input
                name="age"
                type="number"
                min="18"
                max="100"
                value={formData.age}
                onChange={handleChange}
                placeholder="Your age"
              />
            </label>

            <label>
              GENDER
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer_not_to_say">
                  Prefer not to say
                </option>
              </select>
            </label>

            <label>
              FARMING EXPERIENCE
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
              >
                <option value="">Select experience</option>
                <option value="0-2">0–2 years</option>
                <option value="3-5">3–5 years</option>
                <option value="6-10">6–10 years</option>
                <option value="10+">More than 10 years</option>
              </select>
            </label>

          </div>

          <div className="form-section-heading second">
            <span>02</span>
            <div>
              <h2>Farming background</h2>
              <p>Help us understand your agricultural practices.</p>
            </div>
          </div>

          <div className="form-grid">

            <label>
              TYPE OF FARMING
              <select
                name="farmingType"
                value={formData.farmingType}
                onChange={handleChange}
              >
                <option value="">Select farming type</option>
                <option value="traditional">Traditional farming</option>
                <option value="organic">Organic farming</option>
                <option value="mixed">Mixed farming</option>
                <option value="modern">Modern / Precision farming</option>
                <option value="other">Other</option>
              </select>
            </label>

            <label className="full-width">
              FARMER ADDRESS
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Village, Taluka, District, State"
                rows="3"
                maxLength={500}
              />
            </label>

          </div>

          {message && (
            <p
              className="form-message"
              role="status"
              style={{
                color: messageType === "success" ? "#347747" : "#b44444",
              }}
            >
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
              {loading ? "Saving..." : "Save information"}
              {!loading && <span> ↗</span>}
            </button>

          </div>

        </form>

      </section>
    </main>
  );
}

export default FarmerInformation;
