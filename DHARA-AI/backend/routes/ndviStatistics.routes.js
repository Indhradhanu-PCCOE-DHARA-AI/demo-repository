
import express from "express";

import {
  generateFieldNDVIStatistics,
} from "../controllers/ndviStatistics.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
  "/:fieldId",
  authMiddleware,
  generateFieldNDVIStatistics
);

export default router;
