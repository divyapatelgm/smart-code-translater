import { Router } from "express";
import * as assistantController from "../controllers/assistant.controller.js";
import authenticate from "../middleware/auth.middleware.js";

const router = Router();

router.post("/ask", authenticate, assistantController.askAssistant);

export default router;
