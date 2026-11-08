
import express from "express";

import {
  saveFarmerInformation,
  getFarmerInformation,
} from "../controllers/farmer.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// Save or update farmer information
router.post("/", authMiddleware, saveFarmerInformation);

// Get logged-in farmer information
router.get("/", authMiddleware, getFarmerInformation);

export default router;
