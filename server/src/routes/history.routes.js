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
router.put("/share/:id", authenticate, historyController.shareHistoryItem);

// Public route for shared snippets (no authentication required)
router.get("/snippet/:id", historyController.getPublicSnippet);

export default router;