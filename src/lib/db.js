import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "nextjs_app",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    // Removed debug log
  } catch (error) {
    // Handle error gracefully
  }
};
