import User from "../models/User.js";
import crypto from "crypto";
import { generateToken } from "../utils/generateToken.js";

// =======================
// REGISTER (unchanged)
// =======================
export const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      city,
      country,
      currency,
      income,
    } = req.body;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All required fields missing" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be 6+ characters" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      city,
      country,
      currency,
      income: income || 0,
    });

    const token = generateToken(user._id);
    res.status(201).json({
      message: "Registered successfully",
      token,
      user: {
        id: user._id,
        firstName,
        lastName,
        email,
        city,
        country,
        currency,
        income: user.income,
      },
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// =======================
// LOGIN (AUTO-CREATE USER)
// =======================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email & password required" });

    let user = await User.findOne({ email }).select("+password");

    // If user not found → auto-create account
    if (!user) {
      user = await User.create({
        firstName: "User",
        lastName: "Auto",
        email,
        password,
        city: "Unknown",
        country: "Unknown",
        currency: "INR",
        income: 0,
      });
    }

    // Password compare
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    const safeUser = await User.findById(user._id).select("-password");

    res.json({
      message: "Login successful",
      token,
      user: safeUser,
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// =======================
// FORGOT PASSWORD
// =======================
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpire = Date.now() + 60 * 60 * 1000;
    await user.save();

    res.json({
      message: "Password reset token generated",
      token,
    });
  } catch (err) {
    console.error("FORGOT PASSWORD ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// =======================
// RESET PASSWORD
// =======================
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    }).select("+password");

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("RESET ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
