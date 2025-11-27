// backend/controllers/expenseController.js
import Expense from "../models/Expense.js";
import Budget from "../models/Budget.js";
import mongoose from "mongoose";

// ADD EXPENSE
export const addExpense = async (req, res) => {
  try {
    const { title, amount, category, date, note } = req.body;

    if (!title || !amount || !category) {
      return res.status(400).json({
        message: "Please provide title, amount and category",
      });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: "Amount must be greater than 0" });
    }

    const expense = await Expense.create({
      userId: req.user.id,
      title,
      amount,
      category,
      date: date ? new Date(date) : Date.now(),
      note: note || "",
    });

    // Auto Update Monthly Budget spentAmount
    try {
      const d = new Date(expense.date);
      const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}`;

      await Budget.findOneAndUpdate(
        { userId: req.user.id, month: monthKey },
        { $inc: { spentAmount: expense.amount } }
      );
    } catch (bErr) {
      console.error("Budget update failed:", bErr);
    }

    return res.status(201).json({
      message: "Expense added",
      expense,
    });
  } catch (err) {
    console.error("addExpense:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET ALL EXPENSES (enhanced: filtering + pagination)
export const getExpenses = async (req, res) => {
  try {
    const {
      category,
      startDate, // ISO or YYYY-MM-DD
      endDate,
      q,
      page = 1,
      limit = 1000,
      sort = "-date",
    } = req.query;

    const filter = { userId: req.user.id };

    // category filter (store category id/string as-is)
    if (category) filter.category = category;

    // DATE FILTER (validate)
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) {
        const sd = new Date(startDate);
        if (!isNaN(sd)) filter.date.$gte = sd;
      }
      if (endDate) {
        // include entire day for endDate by setting time to 23:59:59.999 if user passed only date
        let ed = new Date(endDate);
        if (!isNaN(ed)) {
          // if user passed YYYY-MM-DD with no time, ensure end of day
          if (endDate.length === 10) {
            ed.setHours(23, 59, 59, 999);
          }
          filter.date.$lte = ed;
        }
      }
      // remove date filter if empty (invalid dates)
      if (Object.keys(filter.date).length === 0) delete filter.date;
    }

    // SEARCH in title or note
    if (q) {
      const cleanQ = q.trim();
      if (cleanQ.length > 0) {
        filter.$or = [
          { title: { $regex: cleanQ, $options: "i" } },
          { note: { $regex: cleanQ, $options: "i" } },
        ];
      }
    }

    // Pagination numeric safety
    const pg = Math.max(1, parseInt(page, 10) || 1);
    const lim = Math.max(1, Math.min(1000, parseInt(limit, 10) || 1000));
    const skip = (pg - 1) * lim;

    // Total count (for client/pagination)
    const total = await Expense.countDocuments(filter);

    // Sorting safety: accept single field with optional leading '-' for desc
    const sortObj = {};
    if (typeof sort === "string") {
      // e.g., "-date" or "amount"
      const field = sort.startsWith("-") ? sort.substring(1) : sort;
      sortObj[field] = sort.startsWith("-") ? -1 : 1;
    } else {
      sortObj.date = -1;
    }

    const expenses = await Expense.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(lim)
      .lean();

    return res.json({
      data: expenses,
      total,
      page: pg,
      limit: lim,
    });
  } catch (err) {
    console.error("getExpenses:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET SINGLE EXPENSE
export const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!expense) return res.status(404).json({ message: "Expense not found" });

    return res.json(expense);
  } catch (err) {
    console.error("getExpenseById:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// UPDATE EXPENSE
export const updateExpense = async (req, res) => {
  try {
    const allowed = ["title", "amount", "category", "date", "note"];
    const updates = {};

    Object.keys(req.body).forEach((k) => {
      if (allowed.includes(k)) updates[k] = req.body[k];
    });

    if (updates.amount && updates.amount <= 0) {
      return res.status(400).json({ message: "Amount must be greater than 0" });
    }

    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      updates,
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res.json({
      message: "Expense updated",
      expense,
    });
  } catch (err) {
    console.error("updateExpense:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// DELETE EXPENSE
export const deleteExpense = async (req, res) => {
  try {
    const deleted = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deleted) return res.status(404).json({ message: "Expense not found" });

    // Auto subtract from budget
    try {
      const d = new Date(deleted.date);
      const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}`;

      await Budget.findOneAndUpdate(
        { userId: req.user.id, month: monthKey },
        { $inc: { spentAmount: -deleted.amount } }
      );
    } catch (bErr) {
      console.error("Budget reduce error:", bErr);
    }

    return res.json({ message: "Expense deleted" });
  } catch (err) {
    console.error("deleteExpense:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
