
import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import "./TemporalAnalysis.css";

const sampleData = {
  "7": [
    { date: "Nov 03", ndvi: 0.42 },
    { date: "Nov 04", ndvi: 0.45 },
    { date: "Nov 05", ndvi: 0.43 },
    { date: "Nov 06", ndvi: 0.49 },
    { date: "Nov 07", ndvi: 0.52 },
    { date: "Nov 08", ndvi: 0.55 },
    { date: "Nov 09", ndvi: 0.58 },
  ],
  "30": [
    { date: "Oct 11", ndvi: 0.31 },
    { date: "Oct 16", ndvi: 0.35 },
    { date: "Oct 21", ndvi: 0.38 },
    { date: "Oct 26", ndvi: 0.42 },
    { date: "Oct 31", ndvi: 0.46 },
    { date: "Nov 04", ndvi: 0.51 },
    { date: "Nov 09", ndvi: 0.58 },
  ],
  "90": [
    { date: "Aug 11", ndvi: 0.28 },
    { date: "Aug 26", ndvi: 0.32 },
    { date: "Sep 10", ndvi: 0.35 },
    { date: "Sep 25", ndvi: 0.39 },
    { date: "Oct 10", ndvi: 0.43 },
    { date: "Oct 25", ndvi: 0.49 },
    { date: "Nov 09", ndvi: 0.58 },
  ],
};

const translations = {
  en: {
    eyebrow: "SATELLITE INTELLIGENCE",
    title: "Crop Growth Monitoring",
    subtitle: "Understand how your crop is growing and how its condition changes over time.",
    demo: "PROTOTYPE DATA",
    period: "View crop progress",
    days7: "7 Days",
    days30: "30 Days",
    days90: "90 Days",
    current: "Current Crop Condition",
    average: "Average Crop Growth",
    change: "Growth Progress",
    improving: "Getting better",
    declining: "Needs attention",
    chartTitle: "Crop Growth Trend",
    chartSubtitle: "How your field's vegetation has changed over time",
    chartNote: "A rising trend generally indicates increasing vegetation cover. Actual crop health also depends on crop type, growth stage and field conditions.",
    low: "Low growth",
    moderate: "Growing well",
    healthy: "Good growth",
    timeline: "Crop Progress History",
    timelineSubtitle: "Changes in your field over the selected period",
    growth: "What is happening in your field?",
    growthText: "The vegetation readings in this prototype show that crop growth is gradually improving.",
    insight1: "Vegetation growth has increased during the selected period.",
    insight2: "Continue checking your crops and soil moisture regularly.",
    insight3: "Watch for unusual changes in leaves, colour or crop growth.",
    disclaimer: "These are illustrative prototype values, not actual satellite measurements. Real field observations require satellite data integration.",
    field: "Field monitoring",
    status: "Growth is improving",
    negativeStatus: "Growth needs attention",
    currentGood: "Good vegetation growth",
    currentModerate: "Vegetation is growing",
    currentLow: "Low vegetation growth",
    averageGood: "Good average growth",
    averageModerate: "Moderate average growth",
    averageLow: "Low average growth",
    axisVeryLow: "Very low",
    axisLow: "Low",
    axisModerate: "Moderate",
    axisGood: "Good",
    axisVeryGood: "Very good",
    timelineImproving: "Growth improving",
    timelineModerate: "Growing steadily",
    timelineLow: "Needs attention",
  },

  hi: {
    eyebrow: "उपग्रह आधारित जानकारी",
    title: "फसल की बढ़त की निगरानी",
    subtitle: "समझें कि आपकी फसल कैसी बढ़ रही है और समय के साथ उसमें क्या बदलाव आ रहे हैं।",
    demo: "प्रोटोटाइप डेटा",
    period: "फसल की प्रगति देखें",
    days7: "7 दिन",
    days30: "30 दिन",
    days90: "90 दिन",
    current: "फसल की वर्तमान स्थिति",
    average: "फसल की औसत बढ़त",
    change: "बढ़त में बदलाव",
    improving: "सुधार हो रहा है",
    declining: "ध्यान देने की जरूरत है",
    chartTitle: "फसल की बढ़त का रुझान",
    chartSubtitle: "समय के साथ खेत में हरियाली में बदलाव",
    chartNote: "बढ़ता हुआ रुझान आमतौर पर हरियाली बढ़ने का संकेत देता है। फसल का वास्तविक स्वास्थ्य उसकी किस्म, बढ़ने के चरण और खेत की स्थिति पर भी निर्भर करता है।",
    low: "कम बढ़त",
    moderate: "अच्छी बढ़त हो रही है",
    healthy: "अच्छी बढ़त",
    timeline: "फसल की प्रगति का रिकॉर्ड",
    timelineSubtitle: "चुनी गई अवधि में खेत में हुए बदलाव",
    growth: "आपके खेत में क्या बदलाव हो रहा है?",
    growthText: "इस प्रोटोटाइप के उदाहरण डेटा में फसल की हरियाली धीरे-धीरे बढ़ती हुई दिखाई दे रही है।",
    insight1: "चुनी गई अवधि में खेत की हरियाली बढ़ी है।",
    insight2: "फसल और मिट्टी की नमी की नियमित जाँच करते रहें।",
    insight3: "पत्तियों के रंग या फसल की बढ़त में असामान्य बदलाव पर ध्यान दें।",
    disclaimer: "ये केवल प्रोटोटाइप के उदाहरण मान हैं, वास्तविक उपग्रह माप नहीं। खेत की वास्तविक जानकारी के लिए उपग्रह डेटा जोड़ना आवश्यक है।",
    field: "खेत की निगरानी",
    status: "फसल की बढ़त में सुधार",
    negativeStatus: "फसल पर ध्यान देने की जरूरत",
    currentGood: "हरियाली अच्छी है",
    currentModerate: "फसल बढ़ रही है",
    currentLow: "हरियाली कम दिखाई दे रही है",
    averageGood: "औसत बढ़त अच्छी है",
    averageModerate: "औसत बढ़त मध्यम है",
    averageLow: "औसत बढ़त कम है",
    axisVeryLow: "बहुत कम",
    axisLow: "कम",
    axisModerate: "मध्यम",
    axisGood: "अच्छी",
    axisVeryGood: "बहुत अच्छी",
    timelineImproving: "बढ़त में सुधार",
    timelineModerate: "धीरे-धीरे बढ़ रही है",
    timelineLow: "ध्यान देने की जरूरत",
  },

  mr: {
    eyebrow: "उपग्रह आधारित माहिती",
    title: "पीक वाढ निरीक्षण",
    subtitle: "तुमचे पीक कसे वाढत आहे आणि कालानुसार त्यात कोणते बदल होत आहेत ते समजून घ्या.",
    demo: "प्रोटोटाइप डेटा",
    period: "पीक प्रगती पाहा",
    days7: "7 दिवस",
    days30: "30 दिवस",
    days90: "90 दिवस",
    current: "पिकाची सध्याची स्थिती",
    average: "पिकाची सरासरी वाढ",
    change: "वाढीतील बदल",
    improving: "सुधारणा होत आहे",
    declining: "लक्ष देण्याची गरज आहे",
    chartTitle: "पीक वाढीचा कल",
    chartSubtitle: "कालानुसार शेतातील हिरवळीत झालेले बदल",
    chartNote: "वाढता कल सामान्यतः हिरवळ वाढत असल्याचे दर्शवतो. पिकाचे वास्तविक आरोग्य पीक प्रकार, वाढीचा टप्पा आणि शेताच्या परिस्थितीवरही अवलंबून असते.",
    low: "कमी वाढ",
    moderate: "चांगली वाढ होत आहे",
    healthy: "चांगली वाढ",
    timeline: "पीक प्रगतीचा इतिहास",
    timelineSubtitle: "निवडलेल्या कालावधीत शेतातील बदल",
    growth: "तुमच्या शेतात काय बदल होत आहेत?",
    growthText: "या प्रोटोटाइपमधील उदाहरणार्थ माहितीनुसार पिकातील हिरवळ हळूहळू वाढत आहे.",
    insight1: "निवडलेल्या कालावधीत शेतातील हिरवळ वाढली आहे.",
    insight2: "पिकांची आणि जमिनीतील ओलाव्याची नियमित तपासणी करा.",
    insight3: "पानांचा रंग किंवा पिकाच्या वाढीतील असामान्य बदलांकडे लक्ष द्या.",
    disclaimer: "ही केवळ प्रोटोटाइपमधील उदाहरणार्थ मूल्ये आहेत, प्रत्यक्ष उपग्रह मोजमाप नाहीत. शेताची वास्तविक माहिती मिळवण्यासाठी उपग्रह डेटा जोडणे आवश्यक आहे.",
    field: "शेत निरीक्षण",
    status: "पिकाच्या वाढीत सुधारणा",
    negativeStatus: "पिकाकडे लक्ष देण्याची गरज",
    currentGood: "हिरवळ चांगली आहे",
    currentModerate: "पीक वाढत आहे",
    currentLow: "हिरवळ कमी दिसत आहे",
    averageGood: "सरासरी वाढ चांगली आहे",
    averageModerate: "सरासरी वाढ मध्यम आहे",
    averageLow: "सरासरी वाढ कमी आहे",
    axisVeryLow: "अतिशय कमी",
    axisLow: "कमी",
    axisModerate: "मध्यम",
    axisGood: "चांगली",
    axisVeryGood: "अतिशय चांगली",
    timelineImproving: "वाढीत सुधारणा",
    timelineModerate: "हळूहळू वाढत आहे",
    timelineLow: "लक्ष देण्याची गरज",
  },
};

function getChartPoints(data) {
  const width = 700;
  const height = 250;
  const left = 42;
  const right = 18;
  const top = 18;
  const bottom = 35;

  return data.map((item, index) => {
    const x =
      left +
      (index / Math.max(data.length - 1, 1)) *
        (width - left - right);

    const y =
      top + (1 - item.ndvi) * (height - top - bottom);

    return {
      ...item,
      x,
      y,
    };
  });
}

function getGrowthLabel(value, t) {
  if (value < 0.35) return t.currentLow;
  if (value < 0.6) return t.currentModerate;
  return t.currentGood;
}

function getAverageLabel(value, t) {
  if (value < 0.35) return t.averageLow;
  if (value < 0.6) return t.averageModerate;
  return t.averageGood;
}

function getTimelineLabel(value, t) {
  if (value < 0.35) return t.timelineLow;
  if (value < 0.6) return t.timelineModerate;
  return t.timelineImproving;
}

function TemporalAnalysis({ farmer, fields = [], locations = [] }) {
  const { language } = useLanguage();

  const t = translations[language] || translations.en;

  const [period, setPeriod] = useState("30");

  const data = sampleData[period];
  const points = getChartPoints(data);

  const latest = data[data.length - 1].ndvi;

  const average =
    data.reduce((sum, item) => sum + item.ndvi, 0) /
    data.length;

  const first = data[0].ndvi;

  const change = ((latest - first) / first) * 100;

  const isImproving = latest >= first;

  const linePoints = points
    .map((point) => `${point.x},${point.y}`)
    .join(" ");

  const areaPoints = [
    `${points[0].x},215`,
    ...points.map((point) => `${point.x},${point.y}`),
    `${points[points.length - 1].x},215`,
  ].join(" ");

  const fieldName =
    fields?.[0]?.fieldName ||
    fields?.[0]?.name ||
    "";

  const locationName =
    locations?.[0]?.city ||
    locations?.[0]?.district ||
    locations?.[0]?.village ||
    "";

  const farmerName = farmer?.name || "";

  const axisLabels = [
    { value: 0, label: t.axisVeryLow },
    { value: 0.25, label: t.axisLow },
    { value: 0.5, label: t.axisModerate },
    { value: 0.75, label: t.axisGood },
    { value: 1, label: t.axisVeryGood },
  ];

  return (
    <div className="temporal-page">

      {/* HEADER */}
      <div className="temporal-header">
        <div>
          <span className="temporal-eyebrow">
            {t.eyebrow}
          </span>

          <h1>{t.title}</h1>

          <p>{t.subtitle}</p>

          {(fieldName || locationName || farmerName) && (
            <div className="temporal-context">
              {fieldName && <span>{fieldName}</span>}
              {locationName && <span>{locationName}</span>}
              {farmerName && <span>{farmerName}</span>}
            </div>
          )}
        </div>

        <span className="temporal-demo-badge">
          {t.demo}
        </span>
      </div>

      {/* DATE FILTER */}
      <section className="temporal-filter-card">
        <div>
          <span className="temporal-small-label">
            {t.period}
          </span>

          <div className="temporal-period-buttons">
            {[
              { value: "7", label: t.days7 },
              { value: "30", label: t.days30 },
              { value: "90", label: t.days90 },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                className={period === item.value ? "active" : ""}
                onClick={() => setPeriod(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="temporal-filter-icon">◷</div>
      </section>

      {/* STATISTICS */}
      <section className="temporal-stats-grid">

        <div className="temporal-stat-card">
          <span>{t.current}</span>
          <strong>{getGrowthLabel(latest, t)}</strong>
          <small>{t.status}</small>
        </div>

        <div className="temporal-stat-card">
          <span>{t.average}</span>
          <strong>{getAverageLabel(average, t)}</strong>
          <small>{t.period}</small>
        </div>

        <div className="temporal-stat-card">
          <span>{t.change}</span>

          <strong className={isImproving ? "temporal-positive" : "temporal-negative"}>
            {change > 0 ? "+" : ""}
            {change.toFixed(1)}%
          </strong>

          <small>
            {isImproving ? t.improving : t.declining}
          </small>
        </div>

      </section>

      {/* CROP GROWTH CHART */}
      <section className="temporal-chart-card">

        <div className="temporal-section-heading">
          <div>
            <h2>{t.chartTitle}</h2>
            <p>{t.chartSubtitle}</p>
          </div>

          <span className="temporal-chart-tag">
            {t.field}
          </span>
        </div>

        <div className="temporal-chart">

          <svg
            viewBox="0 0 700 250"
            role="img"
            aria-label={t.chartTitle}
            preserveAspectRatio="none"
          >

            <defs>
              <linearGradient
                id="temporalGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#6c9b70"
                  stopOpacity="0.65"
                />

                <stop
                  offset="100%"
                  stopColor="#6c9b70"
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>

            {axisLabels.map((item) => {
              const y = 18 + (1 - item.value) * 197;

              return (
                <g key={item.value}>

                  <line
                    x1="42"
                    y1={y}
                    x2="682"
                    y2={y}
                    className="temporal-grid-line"
                  />

                  <text
                    x="5"
                    y={y + 4}
                    className="temporal-axis-label"
                  >
                    {item.label}
                  </text>

                </g>
              );
            })}

            <polygon
              points={areaPoints}
              className="temporal-chart-area"
            />

            <polyline
              points={linePoints}
              className="temporal-chart-line"
              fill="none"
            />

            {points.map((point) => (
              <g key={point.date}>

                <circle
                  cx={point.x}
                  cy={point.y}
                  r="5"
                  className="temporal-chart-point"
                />

                <text
                  x={point.x}
                  y="240"
                  textAnchor="middle"
                  className="temporal-axis-label temporal-date-label"
                >
                  {point.date}
                </text>

              </g>
            ))}

          </svg>

        </div>

        <div className="temporal-chart-legend">
          <span>
            <i className="legend-low" />
            {t.low}
          </span>

          <span>
            <i className="legend-moderate" />
            {t.moderate}
          </span>

          <span>
            <i className="legend-healthy" />
            {t.healthy}
          </span>
        </div>

        <p className="temporal-chart-note">
          {t.chartNote}
        </p>

      </section>

      {/* TIMELINE AND INSIGHTS */}
      <section className="temporal-bottom-grid">

        <div className="temporal-timeline-card">

          <div className="temporal-section-heading">
            <div>
              <h2>{t.timeline}</h2>
              <p>{t.timelineSubtitle}</p>
            </div>
          </div>

          <div className="temporal-timeline-list">

            {data
              .slice()
              .reverse()
              .map((item) => (
                <div
                  className="temporal-timeline-item"
                  key={item.date}
                >

                  <span className="temporal-timeline-dot" />

                  <span className="temporal-timeline-date">
                    {item.date}
                  </span>

                  <strong>
                    {getTimelineLabel(item.ndvi, t)}
                  </strong>

                  <span className="temporal-timeline-status">
                    {getGrowthLabel(item.ndvi, t)}
                  </span>

                </div>
              ))}

          </div>

        </div>

        <div className="temporal-insights-card">

          <span className="temporal-insights-icon">
            ✦
          </span>

          <h2>{t.growth}</h2>

          <p>{t.growthText}</p>

          <ul>
            <li>{t.insight1}</li>
            <li>{t.insight2}</li>
            <li>{t.insight3}</li>
          </ul>

          <span className="temporal-insight-status">
            {isImproving ? t.status : t.negativeStatus}
          </span>

        </div>

      </section>

      {/* DISCLAIMER */}
      <div className="temporal-disclaimer">
        <span>ⓘ</span>

        <p>{t.disclaimer}</p>
      </div>

    </div>
  );
}

export default TemporalAnalysis;
