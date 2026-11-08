
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import "./SensorConnection.css";

function SensorConnection() {
  const navigate = useNavigate();

  const [port, setPort] = useState(null);
  const [status, setStatus] = useState("disconnected");
  const [message, setMessage] = useState("");

  const connectArduino = async () => {
    try {
      if (!("serial" in navigator)) {
        setMessage(
          "Web Serial is not supported. Please use Google Chrome or Microsoft Edge."
        );
        return;
      }

      setMessage("Waiting for Arduino selection...");

      const selectedPort = await navigator.serial.requestPort();

      await selectedPort.open({
        baudRate: 9600,
      });

      setPort(selectedPort);
      setStatus("connected");
      setMessage(
        "Arduino Uno detected! Waiting for sensor readings."
      );
    } catch (error) {
      console.error("Arduino Connection Error:", error);

      if (error.name === "NotFoundError") {
        setMessage("No Arduino device was selected.");
      } else {
        setMessage(
          error.message || "Unable to connect to Arduino."
        );
      }
    }
  };

  const disconnectArduino = async () => {
    try {
      if (port) {
        await port.close();
      }

      setPort(null);
      setStatus("disconnected");
      setMessage("Arduino disconnected.");
    } catch (error) {
      console.error("Disconnect Error:", error);
      setMessage("Unable to disconnect Arduino.");
    }
  };

  return (
    <main className="sensor-connection-page">
      <header className="sensor-header">
        <Logo small />
        <span>DHARA-AI / DEVICE SETUP</span>
      </header>

      <section className="sensor-content">
        <span className="sensor-kicker">
          GROUND SENSOR INTEGRATION
        </span>

        <h1>
          Connect your <em>farm sensors.</em>
        </h1>

        <p>
          Connect your Arduino Uno to DHARA-AI to begin
          collecting real-time ground sensor information.
        </p>

        <div className="sensor-device-card">
          <div className="sensor-device-icon">⌁</div>

          <div>
            <h2>Arduino Uno</h2>
            <p>Primary ground monitoring controller</p>
          </div>

          <span className={`sensor-status ${status}`}>
            {status === "connected" ? "Connected" : "Disconnected"}
          </span>

          {status === "connected" && (
            <div className="sensor-connected-actions">
              <button
                className="sensor-connect-button"
                onClick={disconnectArduino}
              >
                Disconnect Arduino
              </button>

              <button
                className="sensor-connect-button"
                onClick={() => navigate("/dashboard")}
              >
                Continue to Dashboard →
              </button>
            </div>
          )}
        </div>

        <div className="sensor-list">
          <h2>Available sensor modules</h2>

          <div className="sensor-item">
            <span>01</span>
            <div>
              <h3>Soil Moisture Sensor</h3>
              <p>Measures moisture levels in the soil.</p>
            </div>
          </div>

          <div className="sensor-item">
            <span>02</span>
            <div>
              <h3>Soil Temperature Sensor</h3>
              <p>Monitors the temperature beneath the soil.</p>
            </div>
          </div>

          <div className="sensor-item">
            <span>03</span>
            <div>
              <h3>Air Temperature & Humidity</h3>
              <p>Monitors surrounding atmospheric conditions.</p>
            </div>
          </div>
        </div>
        
<div className="sensor-readings-section">
  <div className="sensor-readings-heading">
    <div>
      <span className="sensor-kicker">LIVE MONITORING PREVIEW</span>
      <h2>Ground Sensor Readings</h2>
    </div>
    <span className="sensor-simulation-badge">
      Circuit Simulation
    </span>
  </div>

  <div className="sensor-readings-grid">
    <div className="sensor-reading-card">
      <span className="reading-icon">💧</span>
      <p>Soil Moisture</p>
      <h3>99<span>%</span></h3>
      <small>Soil moisture level</small>
    </div>

    <div className="sensor-reading-card">
      <span className="reading-icon">🌡️</span>
      <p>Soil Temperature</p>
      <h3>24.8<span>°C</span></h3>
      <small>Temperature reading</small>
    </div>

    <div className="sensor-reading-card">
      <span className="reading-icon">☁️</span>
      <p>Air Humidity</p>
      <h3>100<span>%</span></h3>
      <small>Atmospheric humidity</small>
    </div>
  </div>
</div>


        <div className="sensor-instructions">
          <h2>Before connecting</h2>
          <p>1. Connect your Arduino Uno to your computer using USB.</p>
          <p>2. Make sure the Arduino is powered on.</p>
          <p>3. Select the Arduino serial port when prompted.</p>
          <p>4. Keep the Arduino serial baud rate at 9600.</p>
        </div>

        {message && (
          <div className="sensor-message">
            {message}
          </div>
        )}

        <div className="sensor-actions">
          {status === "connected" ? (
            <button
              className="sensor-connect-button"
              onClick={disconnectArduino}
            >
              Disconnect Arduino
            </button>
          ) : (
            <button
  className="sensor-connect-button"
  onClick={() => navigate("/dashboard")}
>
  Continue in Prototype Mode →
</button>
          )}
        </div>
      </section>
    </main>
  );
}

export default SensorConnection;
