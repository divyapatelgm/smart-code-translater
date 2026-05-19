import { Router } from "express";
import {
  registerUser,
  loginUser,
  googleAuth,
  getMe,
  logout,
} from "../controllers/auth.controller.js";
import authenticate from "../middleware/auth.middleware.js";

const router = Router();

// Public routes (no auth needed)
/* Public routes (register, login, google) don't need authentication — the user isn't logged in yet! 
Protected routes (me, logout) use the authenticate middleware from Step 8 to verify the JWT token first. */
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleAuth);

// Protected routes (auth required)
router.get("/me", authenticate, getMe);
router.post("/logout", authenticate, logout);

export default router;