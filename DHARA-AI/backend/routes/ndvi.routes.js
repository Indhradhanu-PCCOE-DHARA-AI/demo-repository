
import express from "express";

import { generateFieldNDVI } from "../controllers/ndvi.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// Generate Sentinel-2 NDVI imagery for a selected field.
router.get(
  "/:fieldId",
  authMiddleware,
  generateFieldNDVI
);

export default router;
