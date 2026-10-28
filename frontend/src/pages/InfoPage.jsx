
import "../styles/info.css";

const sections = [
  {
    id: "farmer",
    number: "01",
    icon: "♧",
    title: "Farmer's Information",
    description:
      "Let us know more abo",
    tag: "PEOPLE",
  },
  {
    id: "field",
    number: "02",
    icon: "🌱",
    title: "Field Info",
    description:
      "Explore field size, soil characteristics, crops and irrigation.",
    tag: "CULTIVATION",
  },
  {
    id: "location",
    number: "03",
    icon: "⌖",
    title: "Location Info",
    description:
      "View geographical details and the location of the farmland.",
    tag: "GEOGRAPHY",
  },
];

export default function InfoPage() {
  function handleSelect(section) {
    // We'll connect each option to its information form next.
    alert(`${section} selected — form coming next!`);
  }

  return (
    <main className="info-screen">
      <header className="info-header">
        <div className="info-brand-text">
          <span>DHARA-AI</span>
          <small>SMARTER AGRICULTURE</small>
        </div>

        <img
          className="info-logo"
          src="/images/dhara-logo.png"
          alt="DHARA-AI logo"
        />
      </header>

      <section className="info-content">
        <div className="info-intro">
          <span className="eyebrow">
            YOUR AGRICULTURE WORKSPACE
          </span>

          <h1>
            Every field has
            <br />
            <span>a story to tell.</span>
          </h1>

          <p>
            Choose an information category to begin exploring
            your agricultural profile.
          </p>
        </div>

        <div className="info-cards">
          {sections.map((section) => (
            <button
              type="button"
              className={`info-card info-card-${section.id}`}
              key={section.id}
              onClick={() => handleSelect(section.title)}
            >
              <div className="card-top">
                <span className="card-number">
                  {section.number}
                </span>
                <span className="card-icon" aria-hidden="true">
                  {section.icon}
                </span>
              </div>

              <span className="card-tag">{section.tag}</span>

              <h2>{section.title}</h2>

              <p>{section.description}</p>

              <span className="card-action">
                Explore section <span aria-hidden="true">↗</span>
              </span>

              <span className="card-decoration" aria-hidden="true">
                {section.id === "farmer"
                  ? "❧"
                  : section.id === "field"
                    ? "〰"
                    : "✳"}
              </span>
            </button>
          ))}
        </div>

        <footer className="info-footer">
          <span>GROWN WITH PURPOSE.</span>
          <span>POWERED BY DHARA-AI © 2026</span>
        </footer>
      </section>
    </main>
  );
}
