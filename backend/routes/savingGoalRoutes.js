import express from "express";
import {
  addGoal,
  getGoals,
  updateGoal,
  deleteGoal,
} from "../controllers/savingGoalController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addGoal); // POST /api/saving-goals
router.get("/", authMiddleware, getGoals); // GET /api/saving-goals
router.put("/:id", authMiddleware, updateGoal); // PUT /api/saving-goals/:id
router.delete("/:id", authMiddleware, deleteGoal); // DELETE /api/saving-goals/:id

export default router;
