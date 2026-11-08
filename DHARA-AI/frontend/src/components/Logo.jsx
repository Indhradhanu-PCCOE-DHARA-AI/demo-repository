const Logo = ({ light = false, small = false }) => (
  <div className={`brand-lockup ${light ? "brand-light" : ""}`}>
    <img
      src="/dhara-logo-mark.png.jpeg.png"
      alt="DHARA botanical logo"
      className={small ? "brand-icon small" : "brand-icon"}
    />

    <div>
      <strong>DHARA-AI</strong>
      <span>SINCE 2026</span>
    </div>
  </div>
);

export default Logo;