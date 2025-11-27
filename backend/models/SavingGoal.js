import mongoose from "mongoose";

const savingGoalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    goalName: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    savedAmount: { type: Number, default: 0 },
    deadline: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("SavingGoal", savingGoalSchema);
