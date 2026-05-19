import { Router } from "express";
import * as historyController from "../controllers/history.controller.js";
import authenticate from "../middleware/auth.middleware.js";

const router = Router();

/**
 * 🔹 History routes are private and user-specific. 
 */

router.get("/", authenticate, historyController.getUserHistory);
router.delete("/clear", authenticate, historyController.clearUserHistory);
router.delete("/:id", authenticate, historyController.deleteHistoryItem);

export default router;