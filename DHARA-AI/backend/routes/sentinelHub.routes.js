
import { Router } from "express";
import {
  testSentinelHubConnection,
} from "../controllers/sentinelHub.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.get(
  "/test",
  authMiddleware,
  testSentinelHubConnection
);

export default router;
