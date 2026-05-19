import { Router } from "express";
import * as codeController from "../controllers/code.controller.js";
import authenticate from "../middleware/auth.middleware.js";

const router = Router();

/**
 * 🔹 All AI code routes are protected. 
 * Users must be logged in to use translation and analysis tools.
 */

router.post("/translate", authenticate, codeController.translate);
router.post("/analyze", authenticate, codeController.analyze);
router.post("/optimize", authenticate, codeController.optimize);
router.post("/explain", authenticate, codeController.explain);
router.post("/execute", authenticate, codeController.execute);

export default router;