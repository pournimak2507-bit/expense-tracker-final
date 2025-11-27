import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import savingGoalRoutes from "./routes/savingGoalRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Connect DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/saving-goals", savingGoalRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/income", incomeRoutes);

// Health check
app.get("/api/ping", (req, res) => res.json({ ok: true }));

// Centralized 404
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
