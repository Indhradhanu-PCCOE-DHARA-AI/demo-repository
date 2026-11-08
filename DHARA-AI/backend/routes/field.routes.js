import express from "express";

import {
  saveFieldInformation,
  getFieldInformation,
} from "../controllers/field.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, saveFieldInformation);
router.get("/", authMiddleware, getFieldInformation);

export default router;