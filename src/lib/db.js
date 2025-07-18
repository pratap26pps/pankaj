// lib/db.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.PROJECT_URL;


let cached = global.mongoose || { conn: null, promise: null };

export const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ MongoDB Connected");
    return cached.conn;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};

if (process.env.NODE_ENV !== "production") {
  global.mongoose = cached;
}
