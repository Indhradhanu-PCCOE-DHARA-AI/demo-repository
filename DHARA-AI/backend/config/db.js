import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      console.warn("MongoDB URI not configured.");
      return;
    }

    await mongoose.connect(mongoURI);

    console.log("MongoDB Connected Successfully!");
    console.log("Database:", mongoose.connection.name);

  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
  }
};

export default connectDB;