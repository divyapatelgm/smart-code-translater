import { Router } from "express";
import * as codeController from "../controllers/code.controller.js";
import authenticate from "../middleware/auth.middleware.js";
import checkQuota from "../middleware/quota.middleware.js";

const router = Router();

/**
 * 🔹 All AI code routes are protected. 
 * Users must be logged in to use translation and analysis tools.
 */

router.post("/translate", authenticate, checkQuota, codeController.translate);
router.post("/analyze", authenticate, checkQuota, codeController.analyze);
router.post("/optimize", authenticate, checkQuota, codeController.optimize);
router.post("/explain", authenticate, checkQuota, codeController.explain);
router.post("/debug", authenticate, checkQuota, codeController.debug);
router.post("/execute", authenticate, codeController.execute);

export default router;