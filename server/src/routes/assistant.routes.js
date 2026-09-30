import { Router } from "express";
import * as assistantController from "../controllers/assistant.controller.js";
import authenticate from "../middleware/auth.middleware.js";
import checkQuota from "../middleware/quota.middleware.js";

const router = Router();

router.post("/ask", authenticate, checkQuota, assistantController.askAssistant);

export default router;
