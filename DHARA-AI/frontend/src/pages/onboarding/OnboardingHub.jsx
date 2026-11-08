
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";

function OnboardingHub({ user, onLogout }) {
  const navigate = useNavigate();

  const sections = [
    {
      number: "01",
      icon: "♧",
      title: "Farmer Information",
      description:
        "Tell us about yourself and your farming background.",
      details: ["Personal details", "Contact information", "Farming experience"],
      path: "/onboarding/farmer",
    },
    {
      number: "02",
      icon: "▤",
      title: "Field Information",
      description:
        "Add details about your crops, fields and agricultural practices.",
      details: ["Crop details", "Field area", "Soil information"],
      path: "/onboarding/field",
    },
    {
      number: "03",
      icon: "⌖",
      title: "Location Data",
      description:
        "Share your farm location and define your field boundaries.",
      details: ["GPS location", "Map your farm", "Farm boundary"],
      path: "/onboarding/location",
    },
  ];

  return (
    <main className="onboarding-page">

      <header className="onboarding-header">
        <Logo small />

        <div className="onboarding-header-actions">
          <span>Welcome, {user?.name || "Farmer"}</span>

          <button onClick={onLogout}>
            Log out ↗
          </button>
        </div>
      </header>

      <section className="onboarding-content">

        <div className="onboarding-heading">
          <span className="section-kicker">
            YOUR DHARA-AI WORKSPACE / SETUP
          </span>

          <h1>
            Let's understand
            <br />
            <em>your land.</em>
          </h1>

          <p>
            Before we begin analysing your farm, we need to
            understand a little about you, your fields and their
            location. Complete these three steps to set up
            your workspace.
          </p>
        </div>

        <div className="onboarding-progress">
          <div>
            <span>YOUR SETUP JOURNEY</span>
            <strong>0 of 3 sections completed</strong>
          </div>

          <div className="progress-track">
            <span />
          </div>
        </div>

        <div className="onboarding-grid">

          {sections.map((section) => (
            <article
              className="onboarding-card"
              key={section.number}
            >
              <div className="onboarding-card-top">
                <span>{section.number} / 03</span>
                <span className="onboarding-card-icon">
                  {section.icon}
                </span>
              </div>

              <h2>{section.title}</h2>

              <p>{section.description}</p>

              <ul>
                {section.details.map((detail) => (
                  <li key={detail}>
                    <span>✓</span> {detail}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate(section.path)}
                className="dark-button onboarding-card-button"
              >
                Get started <span>↗</span>
              </button>
            </article>
          ))}

        </div>

        <div className="onboarding-note">
          <span>✳</span>
          <p>
            Your information helps DHARA-AI create a more
            meaningful picture of your farm. You can review
            your submitted details in your workspace.
          </p>
        </div>

      </section>

      <footer className="onboarding-footer">
        <Logo small />
        <span>© 2026 DHARA-AI · SOLVING PROBLEMS FROM SKY TO SEED</span>
      </footer>

    </main>
  );
}

export default OnboardingHub;
