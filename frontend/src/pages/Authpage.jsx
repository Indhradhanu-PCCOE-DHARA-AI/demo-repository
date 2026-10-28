
import { useState } from "react";
import "../styles/auth.css";

export default function AuthPage({ onDemoSignIn }) {
  const [method, setMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  function handleEmailSubmit(event) {
    event.preventDefault();
    setMessage(
      "Frontend preview only — connect the authentication backend to sign in."
    );
  }

  function handleGoogleSignIn() {
    setMessage(
      "Google sign-in UI is ready. OAuth configuration is required to authenticate."
    );
  }

  function handleAppleSignIn() {
    setMessage(
      "Apple sign-in UI is ready. Apple authentication configuration is required."
    );
  }

  function handlePhoneContinue(event) {
    event.preventDefault();
    setMessage(
      "Phone verification will be available after the authentication backend is connected."
    );
  }

  return (
    <main className="auth-screen">
      <aside className="auth-brand-panel">
        <div className="auth-brand">
          <img
            src="/images/dhara-logo.png"
            alt="DHARA-AI leaf logo"
            className="auth-logo"
          />
          <span>DHARA-AI</span>
        </div>

        <div className="auth-brand-message">
          <span className="auth-kicker">TECHNOLOGY ROOTED IN NATURE</span>
          <h1>
            Grow better.
            <br />
            <span>Know deeper.</span>
          </h1>
          <p>
            Your agricultural world, connected in one place.
            A smarter way to understand your farm.
          </p>
        </div>

        <div className="auth-art" aria-hidden="true">
          <span className="auth-art-sun" />
          <span className="auth-art-hill auth-art-hill-one" />
          <span className="auth-art-hill auth-art-hill-two" />
          <span className="auth-art-field auth-art-field-one" />
          <span className="auth-art-field auth-art-field-two" />
          <span className="auth-art-stem">
            <i />
            <b />
          </span>
        </div>

        <div className="auth-panel-footer">
          <span>ROOTED IN EVERY HARVEST</span>
          <span>EST. 2026</span>
        </div>
      </aside>

      <section className="auth-main">
        <header className="auth-topbar">
          <span className="auth-top-label">
            YOUR FARM. YOUR DATA. YOUR DHARA.
          </span>
          <span className="auth-secure-label">
            <span className="auth-status-dot" />
            CLOUD-READY WORKSPACE
          </span>
        </header>

        <div className="auth-content">
          <div className="auth-heading">
            <span className="auth-kicker">WELCOME TO DHARA-AI</span>
            <h2>Let's get you growing.</h2>
            <p>
              Sign in to access your agricultural information
              and keep your workspace connected.
            </p>
          </div>

          <div className="auth-form-area">
            <button
              className="auth-provider-button"
              type="button"
              onClick={handleGoogleSignIn}
            >
              <span className="google-mark" aria-hidden="true">G</span>
              <span>Continue with Google</span>
              <span className="auth-button-arrow">↗</span>
            </button>

            <button
              className="auth-provider-button"
              type="button"
              onClick={handleAppleSignIn}
            >
              <svg
                className="apple-mark"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M16.37 12.6c.02 2.1 1.84 2.8 1.86 2.81-.02.05-.29 1.02-.96 2.02-.58.87-1.18 1.74-2.13 1.76-.93.02-1.23-.57-2.3-.57-1.06 0-1.4.55-2.28.59-.92.03-1.62-.95-2.2-1.81-1.2-1.75-2.12-4.94-.89-7.1.61-1.07 1.7-1.75 2.88-1.77.9-.02 1.75.63 2.3.63.54 0 1.56-.78 2.63-.66.45.02 1.72.18 2.54 1.36-.07.04-1.52.89-1.5 2.74ZM14.65 6.7c.48-.58.8-1.39.71-2.2-.69.03-1.52.46-2.02 1.04-.45.52-.84 1.34-.73 2.13.77.06 1.56-.4 2.04-.97Z"
                />
              </svg>
              <span>Continue with Apple</span>
              <span className="auth-button-arrow">↗</span>
            </button>

            <div className="auth-divider">
              <span />
              <p>OR CONTINUE WITH</p>
              <span />
            </div>

            <div className="auth-method-tabs">
              <button
                type="button"
                className={method === "email" ? "active" : ""}
                onClick={() => {
                  setMethod("email");
                  setMessage("");
                }}
              >
                Email
              </button>
              <button
                type="button"
                className={method === "phone" ? "active" : ""}
                onClick={() => {
                  setMethod("phone");
                  setMessage("");
                }}
              >
                Mobile number
              </button>
            </div>

            {method === "email" ? (
              <form
                className="auth-form"
                onSubmit={handleEmailSubmit}
              >
                <label htmlFor="auth-email">Email address</label>
                <input
                  id="auth-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />

                <label htmlFor="auth-password">Password</label>
                <div className="auth-password-wrap">
                  <input
                    id="auth-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="auth-show-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <button className="auth-submit" type="submit">
                  Sign in <span>→</span>
                </button>
              </form>
            ) : (
              <form
                className="auth-form"
                onSubmit={handlePhoneContinue}
              >
                <label htmlFor="auth-phone">Mobile number</label>
                <input
                  id="auth-phone"
                  type="tel"
                  inputMode="tel"
                  placeholder="+91 98765 43210"
                  autoComplete="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  required
                />

                <p className="auth-field-note">
                  We'll add OTP verification when the backend is connected.
                </p>

                <button className="auth-submit" type="submit">
                  Continue <span>→</span>
                </button>
              </form>
            )}

            {message && (
              <p className="auth-message" role="status">
                {message}
              </p>
            )}

            <p className="auth-terms">
              By continuing, you agree to our Terms of Service
              and Privacy Policy.
            </p>

            <button
              type="button"
              className="auth-preview-link"
              onClick={onDemoSignIn}
            >
              Preview the information hub →
            </button>
          </div>
        </div>

        <footer className="auth-main-footer">
          <span>DHARA-AI © 2026</span>
          <span>GROW WITH CONFIDENCE.</span>
        </footer>
      </section>
    </main>
  );
}
