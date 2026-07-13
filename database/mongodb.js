import mongoose from "mongoose";
import { DB_URL, NODE_ENV } from "../config/env.js";

if (!DB_URL) {
    throw new Error("Please define the DB_URL environment variable inside .env.<development/production>.local file");
}


const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("✅ MongoDB connected successfully in", NODE_ENV, "mode");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectToDatabase;