
import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import farmerRoutes from "./routes/farmer.routes.js";
import fieldRoutes from "./routes/field.routes.js";
import locationRoutes from "./routes/location.routes.js";
import sentinelHubRoutes from "./routes/sentinelHub.routes.js";
import ndviRoutes from "./routes/ndvi.routes.js";
import ndviStatisticsRoutes from "./routes/ndviStatistics.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/farmer", farmerRoutes);
app.use("/api/field", fieldRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/sentinel", sentinelHubRoutes);
app.use("/api/ndvi", ndviRoutes);
app.use("/api/ndvi-statistics", ndviStatisticsRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to DHARA AI API" });
});

export default app;
