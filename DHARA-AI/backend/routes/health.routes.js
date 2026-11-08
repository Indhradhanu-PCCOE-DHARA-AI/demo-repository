import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", (req, res) => {

  const databaseConnected =
    mongoose.connection.readyState === 1;

  res.status(200).json({
    success: true,
    application: "DHARA AI",
    message: "Backend is running successfully!",
    database: databaseConnected
      ? "Connected"
      : "Disconnected",
    timestamp: new Date()
  });

});

export default router;