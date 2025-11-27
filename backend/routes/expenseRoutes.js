import express from "express";
import {
  addExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addExpense);
router.get("/", authMiddleware, getExpenses);
router.get("/:id", authMiddleware, getExpenseById);
router.put("/update/:id", authMiddleware, updateExpense);
router.delete("/delete/:id", authMiddleware, deleteExpense);

export default router;
