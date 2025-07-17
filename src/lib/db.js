// lib/mongoose.js
import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  if (!process.env.PROJECT_URL) {
    console.error('❌ PROJECT_URL not defined');
    return;
  }

  try {
    await mongoose.connect(process.env.PROJECT_URL, {
      dbName: 'nextjs_app',
    });

    isConnected = true;
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
  }
};
