
import express from "express";

import {
  saveLocationInformation,
  getLocationInformation,
} from "../controllers/location.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, saveLocationInformation);
router.get("/", authMiddleware, getLocationInformation);

export default router;
