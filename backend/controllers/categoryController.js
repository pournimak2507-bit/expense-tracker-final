import Category from "../models/Category.js";

// default categories list
const defaultCategories = [
  "Food",
  "Travel",
  "Shopping",
  "Bills",
  "Entertainment",
  "Health",
  "Groceries",
];

async function ensureDefaultCategories(userId) {
  for (const name of defaultCategories) {
    const exists = await Category.findOne({
      $or: [{ userId }, { userId: null }],
      name,
    });

    if (!exists) {
      await Category.create({
        name,
        userId: null,
        isDefault: true,
      });
    }
  }
}

// ADD CATEGORY (USER)
export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name?.trim())
      return res.status(400).json({ message: "Category name is required" });

    const cleanName = name.trim();

    // prevent duplicates with default + user
    const existing = await Category.findOne({
      name: { $regex: new RegExp("^" + cleanName + "$", "i") },
      $or: [{ userId: req.user.id }, { isDefault: true }],
    });

    if (existing)
      return res.status(409).json({ message: "Category already exists" });

    const category = await Category.create({
      userId: req.user.id,
      name: cleanName,
      isDefault: false,
    });

    res.status(201).json(category);
  } catch (err) {
    console.error("addCategory Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET CATEGORIES (user + default both)
export const getCategories = async (req, res) => {
  try {
    await ensureDefaultCategories(req.user.id);

    const categories = await Category.find({
      $or: [{ userId: req.user.id }, { isDefault: true }],
    }).sort({ name: 1 });

    res.json(categories);
  } catch (err) {
    console.error("getCategories Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE USER CATEGORY ONLY
export const deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
      isDefault: false, // default categories cannot be deleted
    });

    if (!deleted)
      return res
        .status(404)
        .json({ message: "Category not found or protected" });

    res.json({ message: "Category deleted" });
  } catch (err) {
    console.error("deleteCategory Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
