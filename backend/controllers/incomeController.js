import User from "../models/User.js";

// GET USER INCOME
export const getIncome = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("income recurrence");

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json({
      amount: user.income || 0,
      recurrence: user.recurrence || "Monthly",
    });
  } catch (err) {
    console.error("getIncome error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// SET / UPDATE INCOME
export const setIncome = async (req, res) => {
  try {
    const { amount, recurrence } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ message: "Income must be greater than 0" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        income: Number(amount),
        recurrence: recurrence || "Monthly",
      },
      { new: true }
    ).select("-password");

    return res.json({
      message: "Income updated",
      amount: updatedUser.income,
      recurrence: updatedUser.recurrence,
    });
  } catch (err) {
    console.error("setIncome error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
