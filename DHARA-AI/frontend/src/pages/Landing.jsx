
import Logo from "../components/Logo";

function Landing({ onAuth }) {
  return (
    <main className="landing">
      <header className="site-header">
        <a href="#home" className="header-logo">
          <Logo small />
        </a>

        <nav className="main-nav">
          <a href="#platform">Platform</a>
          <a href="#intelligence">Intelligence</a>
          <a href="#about">About</a>
        </nav>

        <div className="header-actions">
          <button
            className="text-button"
            onClick={() => onAuth("signin")}
          >
            Sign in
          </button>

          <button
            className="dark-button header-cta"
            onClick={() => onAuth("signup")}
          >
            Get started <span>↗</span>
          </button>
        </div>
      </header>

      <section className="hero-section" id="home">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            A NEW PERSPECTIVE ON AGRICULTURE
          </div>

          <h1>
            See the land
            <br />
            differently. <em>Grow</em>
            <br />
            <em>smarter.</em>
          </h1>

          <p className="hero-description">
            From satellite intelligence to on-ground insights,
            bring every part of your farm into one thoughtful
            workspace.
          </p>

          <div className="hero-actions">
            <button
              className="dark-button"
              onClick={() => onAuth("signup")}
            >
              Explore DHARA-AI <span>↗</span>
            </button>

            <a href="#platform" className="learn-link">
              Discover the platform <span>↓</span>
            </a>
          </div>

          <div className="hero-footnote">
            <span className="online-dot" />
            INTELLIGENCE THAT STARTS WITH YOUR LAND
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image" role="img"
            aria-label="Aerial view of agricultural fields" />

          <div className="image-coordinate">
            <span>FIELD OBSERVATION / 01</span>
            <strong>18°31' N · 73°51' E</strong>
          </div>

          <div className="floating-insight">
            <span className="insight-icon">✳</span>
            <div>
              <small>LAND INTELLIGENCE</small>
              <strong>Every field has a story.</strong>
            </div>
          </div>

          <div className="image-index">01 — 04</div>
        </div>
      </section>

      <section className="trust-strip">
        <span>ONE CONNECTED AGRICULTURE WORKSPACE</span>
        <div><i /> SATELLITE DATA</div>
        <div><i /> FIELD MONITORING</div>
        <div><i /> CROP INTELLIGENCE</div>
        <div><i /> DATA-DRIVEN DECISIONS</div>
      </section>

      <section className="intro-section section-pad" id="platform">
        <div className="section-kicker">01 / THE PLATFORM</div>

        <div className="intro-grid">
          <h2>
            From raw imagery to
            <br />
            <em>actionable intelligence.</em>
          </h2>

          <div className="intro-copy">
            <p>
              Farming is full of signals. The challenge is knowing
              what they mean. DHARA-AI brings satellite observations,
              field information and sensor insights together to help
              you understand what is happening on your land.
            </p>

            <a href="#intelligence" className="underlined-link">
              Explore our approach <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="feature-section section-pad" id="intelligence">
        <div className="section-heading-row">
          <div>
            <div className="section-kicker">02 / WHAT YOU CAN DO</div>
            <h2>
              Better signals.
              <br />
              <em>Better decisions.</em>
            </h2>
          </div>

          <p>
            One platform. Multiple perspectives.
            <br />
            A clearer picture of your farm.
          </p>
        </div>

        <div className="feature-grid">
          <article className="feature-card feature-dark">
            <div className="feature-number">01</div>
            <div className="feature-symbol">◉</div>
            <h3>Satellite<br />intelligence</h3>
            <p>Explore vegetation patterns and observe changes across your fields.</p>
            <span className="feature-arrow">↗</span>
          </article>

          <article className="feature-card feature-image-card">
            <div className="feature-number">02</div>
            <div className="feature-symbol">⌖</div>
            <h3>Connected<br />field insights</h3>
            <p>Bring farm boundaries, field details and ground observations together.</p>
            <span className="feature-arrow">↗</span>
          </article>

          <article className="feature-card feature-light">
            <div className="feature-number">03</div>
            <div className="feature-symbol">✳</div>
            <h3>Crop health<br />analysis</h3>
            <p>Investigate crop images and understand possible plant health concerns.</p>
            <span className="feature-arrow">↗</span>
          </article>

          <article className="feature-card feature-pale">
            <div className="feature-number">04</div>
            <div className="feature-symbol">⌁</div>
            <h3>Farm<br />analytics</h3>
            <p>Review historical observations and track your farm over time.</p>
            <span className="feature-arrow">↗</span>
          </article>
        </div>
      </section>

      <section className="closing-section" id="about">
        <div className="closing-mark">
          <img src="/dhara-logo-mark.png.jpeg.png" alt="" />
        </div>

        <div className="section-kicker">THE NEXT CHAPTER OF FARMING</div>

        <h2>
          Your land has potential.
          <br />
          <em>Let's understand it.</em>
        </h2>

        <p>
          Start building a clearer picture of your farm with DHARA-AI.
        </p>

        <button
          className="light-button"
          onClick={() => onAuth("signup")}
        >
          Get started with DHARA-AI <span>↗</span>
        </button>

        <span className="closing-since">DHARA-AI · SINCE 2026</span>
      </section>

      <footer className="site-footer">
        <Logo small />
        <span>© 2026 DHARA-AI. SOLVING PROBLEMS FROM SKY TO SEED.</span>
        <a href="#home">BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}

export default Landing;
