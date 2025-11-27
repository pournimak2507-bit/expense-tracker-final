import express from "express";
import {
  addCategory,
  getCategories,
  deleteCategory,
} from "../controllers/categoryController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addCategory);
router.get("/", authMiddleware, getCategories);
router.delete("/delete/:id", authMiddleware, deleteCategory);

export default router;
