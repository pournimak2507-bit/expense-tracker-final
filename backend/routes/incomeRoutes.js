import express from "express";
import { getIncome, setIncome } from "../controllers/incomeController.js";
import { authMiddleware } from "../middleware/authMiddleware.js"; // was 'protect', fix to authMiddleware

const router = express.Router();

router.get("/", authMiddleware, getIncome); // get income
router.post("/", authMiddleware, setIncome); // set/update income

export default router;
