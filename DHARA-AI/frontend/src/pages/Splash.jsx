import { useEffect } from "react";

function Splash({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 4200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <main className="splash">
      <div className="splash-center">
        <img
          src="/dhara-logo-mark.png.jpeg.png"
          alt="DHARA-AI"
          className="splash-mark"
        />

        <h1 className="splash-wordmark">DHARA-AI</h1>

        <p className="splash-since">
          S I N C E &nbsp; 2 0 2 6
        </p>

        <div className="splash-rule" />

        <p className="splash-caption">
          SOLVING PROBLEMS FROM SKY TO SEED
        </p>
      </div>

      <span className="splash-bottom">
        INTELLIGENCE FOR EVERY FIELD
      </span>
    </main>
  );
}

export default Splash;