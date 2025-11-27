import express from "express";
import { setBudget, getBudget } from "../controllers/budgetController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/set", authMiddleware, setBudget);
router.get("/", authMiddleware, getBudget);

export default router;
