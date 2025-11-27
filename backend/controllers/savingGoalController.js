import SavingGoal from "../models/SavingGoal.js";

// ADD GOAL
export const addGoal = async (req, res) => {
  try {
    const { goalName, targetAmount, deadline, savedAmount } = req.body;
    if (!goalName || !targetAmount || !deadline)
      return res.status(400).json({ message: "All fields required" });

    const goal = await SavingGoal.create({
      userId: req.user.id,
      goalName,
      targetAmount,
      savedAmount: savedAmount || 0,
      deadline: new Date(deadline),
    });

    res.status(201).json({ data: goal });
  } catch (err) {
    console.error("addGoal:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL GOALS
export const getGoals = async (req, res) => {
  try {
    const goals = await SavingGoal.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json({ data: goals });
  } catch (err) {
    console.error("getGoals:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE GOAL
export const updateGoal = async (req, res) => {
  try {
    const updates = {};
    ["goalName", "targetAmount", "savedAmount", "deadline"].forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const goal = await SavingGoal.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      updates,
      { new: true }
    );

    if (!goal) return res.status(404).json({ message: "Goal not found" });
    res.json({ data: goal });
  } catch (err) {
    console.error("updateGoal:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE GOAL
export const deleteGoal = async (req, res) => {
  try {
    const goal = await SavingGoal.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!goal) return res.status(404).json({ message: "Goal not found" });
    res.json({ message: "Goal deleted successfully" });
  } catch (err) {
    console.error("deleteGoal:", err);
    res.status(500).json({ message: "Server error" });
  }
};
