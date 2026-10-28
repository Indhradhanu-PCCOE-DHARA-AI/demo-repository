
import "../styles/intro.css";

export default function Intro({ onComplete }) {
  function handleAnimationEnd(event) {
    if (
      event.target.classList.contains("intro-wordmark") &&
      event.animationName === "wordmark-reveal"
    ) {
      onComplete?.();
    }
  }

  return (
    <main className="intro-screen">
      <div className="intro-brand">
        <div className="intro-logo-slot">
          <div className="intro-logo-reveal">
            <img
              className="intro-logo"
              src="/images/dhara-logo.png"
              alt="DHARA-AI logo"
            />
          </div>
        </div>

        <div
          className="intro-wordmark"
          onAnimationEnd={handleAnimationEnd}
        >
          <h1>DHARA-AI</h1>
          <p>SINCE 2026</p>
        </div>
      </div>
    </main>
  );
}
