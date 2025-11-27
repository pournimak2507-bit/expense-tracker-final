import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // default categories = no userId
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
