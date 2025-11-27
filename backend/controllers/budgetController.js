import Budget from "../models/Budget.js";

// SET OR UPDATE MONTHLY BUDGET
export const setBudget = async (req, res) => {
  try {
    const { month, budgetAmount } = req.body;

    if (!month || typeof budgetAmount === "undefined") {
      return res
        .status(400)
        .json({ message: "Month & budgetAmount are required" });
    }

    if (budgetAmount < 0) {
      return res.status(400).json({ message: "Budget must be positive" });
    }

    // Check existing budget record
    let existing = await Budget.findOne({
      userId: req.user.id,
      month,
    });

    if (existing) {
      // Update existing
      existing.budgetAmount = budgetAmount;
      await existing.save();

      return res.json({
        message: "Budget updated successfully",
        budget: existing,
      });
    }

    // Create new monthly budget
    const newBudget = await Budget.create({
      userId: req.user.id,
      month,
      budgetAmount,
      spentAmount: 0,
    });

    return res.status(201).json({
      message: "Budget created successfully",
      budget: newBudget,
    });
  } catch (err) {
    console.error("setBudget:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET ALL BUDGETS
export const getBudget = async (req, res) => {
  try {
    const budgets = await Budget.find({
      userId: req.user.id,
    }).sort({ month: 1 });

    return res.json(budgets);
  } catch (err) {
    console.error("getBudget:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
