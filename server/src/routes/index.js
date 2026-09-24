import { Router } from "express";
import authRoutes from "./auth.routes.js";
import codeRoutes from "./code.routes.js";
import historyRoutes from "./history.routes.js";
import assistantRoutes from "./assistant.routes.js";

/* This file bundles all route modules together. 
Final URLs:
/api/auth/...
/api/code/...
/api/history/...
*/

const router = Router();

router.use("/auth", authRoutes);
router.use("/code", codeRoutes);
router.use("/history", historyRoutes);
router.use("/assistant", assistantRoutes);

export default router;