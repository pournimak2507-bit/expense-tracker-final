import express from "express";
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
