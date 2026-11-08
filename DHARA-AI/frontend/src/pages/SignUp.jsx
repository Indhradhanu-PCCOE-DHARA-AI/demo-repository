
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../components/Logo";

function SignUp({ onAuthenticated }) {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "")
      .trim()
      .toLowerCase();
    const password = String(formData.get("password") || "");
    const confirmPassword = String(
      formData.get("confirmPassword") || ""
    );

    if (name.length < 2) {
      setMessage("Please enter your full name.");
      return;
    }

    if (password.length < 8) {
      setMessage("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match. Please try again.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/auth"}/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Account creation failed. Please try again."
        );
      }

      if (!data.token || !data.user) {
        throw new Error("Incomplete server response.");
      }

      localStorage.setItem("dhara_token", data.token);
      localStorage.setItem("dhara_user", JSON.stringify(data.user));

      onAuthenticated(data.user);
      navigate("/onboarding", { replace: true });

    } catch (error) {
      setMessage(
        error.message === "Failed to fetch"
          ? "Cannot connect to DHARA-AI server. Please check your backend."
          : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">

      <div className="auth-side-visual">
        <button
          className="back-home"
          onClick={() => navigate("/home")}
        >
          ← Back to home
        </button>

        <div className="auth-side-content">
          <Logo light />
          <span className="auth-side-line" />

          <h1>
            A clearer view
            <br />
            of <em>what matters.</em>
          </h1>

          <p>
            Intelligence for every field. Insight for every decision.
          </p>
        </div>

        <span className="auth-side-footer">
          SOLVING PROBLEMS FROM SKY TO SEED
        </span>
      </div>

      <div className="auth-form-side">

        <div className="auth-mobile-logo">
          <Logo small />
        </div>

        <div className="auth-form-wrap">

          <div className="section-kicker">
            YOUR DHARA-AI WORKSPACE
          </div>

          <h2>Begin your journey.</h2>

          <p className="auth-subtitle">
            Create an account to bring your farm into focus.
          </p>

          <div className="auth-switch">
            <Link to="/signup" className="active">
              Create account
            </Link>

            <Link to="/signin">
              Sign in
            </Link>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>

            <label>
              FULL NAME
              <input
                name="name"
                type="text"
                placeholder="Your name"
                minLength="2"
                maxLength="60"
                autoComplete="name"
                required
              />
            </label>

            <label>
              EMAIL ADDRESS
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </label>

            <label>
              PASSWORD
              <input
                name="password"
                type="password"
                placeholder="Create a password"
                minLength="8"
                autoComplete="new-password"
                required
              />
            </label>

            <label>
              CONFIRM PASSWORD
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                minLength="8"
                autoComplete="new-password"
                required
              />
            </label>

            <button
              type="submit"
              className="dark-button auth-submit"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create my account"}

              {!loading && <span>↗</span>}
            </button>

          </form>

          {message && (
            <p className="auth-message" role="alert">
              {message}
            </p>
          )}

          <p className="auth-legal">
            By continuing, you agree to use DHARA-AI responsibly.
            Your farm information will be handled through your account.
          </p>

        </div>

        <span className="auth-copyright">
          © 2026 DHARA-AI
        </span>

      </div>
    </main>
  );
}

export default SignUp;
