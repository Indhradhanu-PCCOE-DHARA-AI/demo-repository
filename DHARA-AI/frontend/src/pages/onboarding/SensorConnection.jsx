
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import { useLanguage } from "../../context/LanguageContext";
import "./SensorConnection.css";

const sensorTranslations = {
  en: {
    deviceSetup: "DHARA-AI / DEVICE SETUP",
    kicker: "GROUND SENSOR INTEGRATION",
    title: "Connect your",
    titleEm: "farm sensors.",
    intro:
      "Connect your Arduino Uno to DHARA-AI to begin collecting real-time ground sensor information.",
    arduino: "Arduino Uno",
    controller: "Primary ground monitoring controller",
    connected: "Connected",
    disconnected: "Disconnected",
    disconnect: "Disconnect Arduino",
    continueDashboard: "Continue to Dashboard →",
    availableSensors: "Available sensor modules",
    soilMoisture: "Soil Moisture Sensor",
    soilMoistureDesc: "Measures moisture levels in the soil.",
    soilTemperature: "Soil Temperature Sensor",
    soilTemperatureDesc: "Monitors the temperature beneath the soil.",
    airTemperature: "Air Temperature & Humidity",
    airTemperatureDesc: "Monitors surrounding atmospheric conditions.",
    livePreview: "LIVE MONITORING PREVIEW",
    readings: "Ground Sensor Readings",
    simulation: "Circuit Simulation",
    moistureLevel: "Soil moisture level",
    temperatureReading: "Temperature reading",
    atmosphericHumidity: "Atmospheric humidity",
    airHumidity: "Air Humidity",
    beforeConnecting: "Before connecting",
    instruction1: "1. Connect your Arduino Uno to your computer using USB.",
    instruction2: "2. Make sure the Arduino is powered on.",
    instruction3: "3. Select the Arduino serial port when prompted.",
    instruction4: "4. Keep the Arduino serial baud rate at 9600.",
    prototypeMode: "Continue in Prototype Mode →",
    unsupported:
      "Web Serial is not supported. Please use Google Chrome or Microsoft Edge.",
    selecting: "Waiting for Arduino selection...",
    detected: "Arduino Uno detected! Waiting for sensor readings.",
    notSelected: "No Arduino device was selected.",
    unableConnect: "Unable to connect to Arduino.",
    disconnectedMessage: "Arduino disconnected.",
    unableDisconnect: "Unable to disconnect Arduino.",
  },

  hi: {
    deviceSetup: "DHARA-AI / डिवाइस सेटअप",
    kicker: "ग्राउंड सेंसर एकीकरण",
    title: "अपने",
    titleEm: "खेत के सेंसर जोड़ें।",
    intro:
      "वास्तविक समय में मिट्टी के सेंसर की जानकारी प्राप्त करने के लिए अपने Arduino Uno को DHARA-AI से जोड़ें।",
    arduino: "Arduino Uno",
    controller: "मुख्य भूमि निगरानी नियंत्रक",
    connected: "कनेक्टेड",
    disconnected: "डिस्कनेक्टेड",
    disconnect: "Arduino डिस्कनेक्ट करें",
    continueDashboard: "डैशबोर्ड पर जाएं →",
    availableSensors: "उपलब्ध सेंसर मॉड्यूल",
    soilMoisture: "मिट्टी की नमी का सेंसर",
    soilMoistureDesc: "मिट्टी में नमी का स्तर मापता है।",
    soilTemperature: "मिट्टी का तापमान सेंसर",
    soilTemperatureDesc: "मिट्टी के अंदर का तापमान मापता है।",
    airTemperature: "हवा का तापमान और आर्द्रता",
    airTemperatureDesc: "आसपास के वातावरण की स्थिति पर नज़र रखता है।",
    livePreview: "लाइव मॉनिटरिंग पूर्वावलोकन",
    readings: "ग्राउंड सेंसर रीडिंग",
    simulation: "सर्किट सिमुलेशन",
    moistureLevel: "मिट्टी में नमी का स्तर",
    temperatureReading: "तापमान रीडिंग",
    atmosphericHumidity: "वायुमंडलीय आर्द्रता",
    airHumidity: "हवा की आर्द्रता",
    beforeConnecting: "कनेक्ट करने से पहले",
    instruction1: "1. USB केबल से Arduino Uno को अपने कंप्यूटर से जोड़ें।",
    instruction2: "2. सुनिश्चित करें कि Arduino चालू है।",
    instruction3: "3. पूछे जाने पर Arduino का सीरियल पोर्ट चुनें।",
    instruction4: "4. Arduino की सीरियल बॉड रेट 9600 रखें।",
    prototypeMode: "प्रोटोटाइप मोड में आगे बढ़ें →",
    unsupported:
      "Web Serial समर्थित नहीं है। कृपया Google Chrome या Microsoft Edge का उपयोग करें।",
    selecting: "Arduino चुनने की प्रतीक्षा है...",
    detected: "Arduino Uno मिल गया! सेंसर रीडिंग की प्रतीक्षा है।",
    notSelected: "कोई Arduino डिवाइस नहीं चुना गया।",
    unableConnect: "Arduino से कनेक्ट नहीं हो पाया।",
    disconnectedMessage: "Arduino डिस्कनेक्ट हो गया।",
    unableDisconnect: "Arduino डिस्कनेक्ट नहीं हो पाया।",
  },

  mr: {
    deviceSetup: "DHARA-AI / डिव्हाइस सेटअप",
    kicker: "ग्राउंड सेन्सर एकत्रीकरण",
    title: "तुमचे",
    titleEm: "शेतीचे सेन्सर जोडा.",
    intro:
      "रिअल-टाइममध्ये जमिनीच्या सेन्सरची माहिती मिळवण्यासाठी तुमचा Arduino Uno DHARA-AI शी जोडा.",
    arduino: "Arduino Uno",
    controller: "मुख्य जमीन निरीक्षण नियंत्रक",
    connected: "कनेक्ट झाले",
    disconnected: "डिस्कनेक्ट झाले",
    disconnect: "Arduino डिस्कनेक्ट करा",
    continueDashboard: "डॅशबोर्डवर जा →",
    availableSensors: "उपलब्ध सेन्सर मॉड्यूल्स",
    soilMoisture: "मातीतील ओलावा सेन्सर",
    soilMoistureDesc: "मातीतील ओलाव्याचे प्रमाण मोजतो.",
    soilTemperature: "मातीचे तापमान सेन्सर",
    soilTemperatureDesc: "मातीच्या आतील तापमानावर लक्ष ठेवतो.",
    airTemperature: "हवेचे तापमान आणि आर्द्रता",
    airTemperatureDesc: "आजूबाजूच्या वातावरणाच्या स्थितीवर लक्ष ठेवतो.",
    livePreview: "थेट निरीक्षण पूर्वावलोकन",
    readings: "ग्राउंड सेन्सर रीडिंग",
    simulation: "सर्किट सिम्युलेशन",
    moistureLevel: "मातीतील ओलाव्याचे प्रमाण",
    temperatureReading: "तापमान रीडिंग",
    atmosphericHumidity: "वातावरणातील आर्द्रता",
    airHumidity: "हवेतील आर्द्रता",
    beforeConnecting: "कनेक्ट करण्यापूर्वी",
    instruction1: "1. USB केबल वापरून Arduino Uno संगणकाशी जोडा.",
    instruction2: "2. Arduino सुरू असल्याची खात्री करा.",
    instruction3: "3. विचारल्यावर Arduino चा सिरीयल पोर्ट निवडा.",
    instruction4: "4. Arduino चा सिरीयल बॉड रेट 9600 ठेवा.",
    prototypeMode: "प्रोटोटाइप मोडमध्ये पुढे जा →",
    unsupported:
      "Web Serial समर्थित नाही. कृपया Google Chrome किंवा Microsoft Edge वापरा.",
    selecting: "Arduino निवडण्याची प्रतीक्षा आहे...",
    detected: "Arduino Uno आढळला! सेन्सर रीडिंगची प्रतीक्षा आहे.",
    notSelected: "कोणतेही Arduino डिव्हाइस निवडले नाही.",
    unableConnect: "Arduino शी कनेक्ट करता आले नाही.",
    disconnectedMessage: "Arduino डिस्कनेक्ट झाले.",
    unableDisconnect: "Arduino डिस्कनेक्ट करता आले नाही.",
  },
};

function SensorConnection() {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();

  const t = sensorTranslations[language] || sensorTranslations.en;

  const [port, setPort] = useState(null);
  const [status, setStatus] = useState("disconnected");
  const [message, setMessage] = useState("");

  const connectArduino = async () => {
    try {
      if (!("serial" in navigator)) {
        setMessage(t.unsupported);
        return;
      }

      setMessage(t.selecting);

      const selectedPort = await navigator.serial.requestPort();

      await selectedPort.open({
        baudRate: 9600,
      });

      setPort(selectedPort);
      setStatus("connected");
      setMessage(t.detected);
    } catch (error) {
      console.error("Arduino Connection Error:", error);

      if (error.name === "NotFoundError") {
        setMessage(t.notSelected);
      } else {
        setMessage(error.message || t.unableConnect);
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
      setMessage(t.disconnectedMessage);
    } catch (error) {
      console.error("Disconnect Error:", error);
      setMessage(t.unableDisconnect);
    }
  };

  return (
    <main className="sensor-connection-page">
      <header className="sensor-header">
        <Logo small />
        <span>{t.deviceSetup}</span>

        <select
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
          aria-label="Select language"
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
          <option value="mr">मराठी</option>
        </select>
      </header>

      <section className="sensor-content">
        <span className="sensor-kicker">{t.kicker}</span>

        <h1>
          {t.title} <em>{t.titleEm}</em>
        </h1>

        <p>{t.intro}</p>

        <div className="sensor-device-card">
          <div className="sensor-device-icon">⌁</div>

          <div>
            <h2>{t.arduino}</h2>
            <p>{t.controller}</p>
          </div>

          <span className={`sensor-status ${status}`}>
            {status === "connected" ? t.connected : t.disconnected}
          </span>

          {status === "connected" && (
            <div className="sensor-connected-actions">
              <button
                className="sensor-connect-button"
                onClick={disconnectArduino}
              >
                {t.disconnect}
              </button>

              <button
                className="sensor-connect-button"
                onClick={() => navigate("/dashboard")}
              >
                {t.continueDashboard}
              </button>
            </div>
          )}
        </div>

        <div className="sensor-list">
          <h2>{t.availableSensors}</h2>

          <div className="sensor-item">
            <span>01</span>
            <div>
              <h3>{t.soilMoisture}</h3>
              <p>{t.soilMoistureDesc}</p>
            </div>
          </div>

          <div className="sensor-item">
            <span>02</span>
            <div>
              <h3>{t.soilTemperature}</h3>
              <p>{t.soilTemperatureDesc}</p>
            </div>
          </div>

          <div className="sensor-item">
            <span>03</span>
            <div>
              <h3>{t.airTemperature}</h3>
              <p>{t.airTemperatureDesc}</p>
            </div>
          </div>
        </div>

        <div className="sensor-readings-section">
          <div className="sensor-readings-heading">
            <div>
              <span className="sensor-kicker">{t.livePreview}</span>
              <h2>{t.readings}</h2>
            </div>

            <span className="sensor-simulation-badge">
              {t.simulation}
            </span>
          </div>

          <div className="sensor-readings-grid">
            <div className="sensor-reading-card">
              <span className="reading-icon">💧</span>
              <p>{t.soilMoisture}</p>
              <h3>
                99<span>%</span>
              </h3>
              <small>{t.moistureLevel}</small>
            </div>

            <div className="sensor-reading-card">
              <span className="reading-icon">🌡️</span>
              <p>{t.soilTemperature}</p>
              <h3>
                24.8<span>°C</span>
              </h3>
              <small>{t.temperatureReading}</small>
            </div>

            <div className="sensor-reading-card">
              <span className="reading-icon">☁️</span>
              <p>{t.airHumidity}</p>
              <h3>
                100<span>%</span>
              </h3>
              <small>{t.atmosphericHumidity}</small>
            </div>
          </div>
        </div>

        <div className="sensor-instructions">
          <h2>{t.beforeConnecting}</h2>
          <p>{t.instruction1}</p>
          <p>{t.instruction2}</p>
          <p>{t.instruction3}</p>
          <p>{t.instruction4}</p>
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
              {t.disconnect}
            </button>
          ) : (
            <button
              className="sensor-connect-button"
              onClick={() => navigate("/dashboard")}
            >
              {t.prototypeMode}
            </button>
          )}
        </div>
      </section>
    </main>
  );
}

export default SensorConnection;
