import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB Connected");
};

const createTestUser = async () => {
  const hashedPassword = await bcrypt.hash("123456", 10);
  const userExists = await User.findOne({ email: "test@example.com" });
  if (userExists) return console.log("Test user already exists");

  await User.create({
    name: "Test User",
    email: "test@example.com",
    password: hashedPassword,
  });
  console.log("Test user created successfully");
  mongoose.connection.close();
};

connectDB().then(createTestUser);
