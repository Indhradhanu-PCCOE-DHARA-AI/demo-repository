
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = Number(process.env.PORT) || 5000;

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log("--------------------------------");
      console.log("DHARA AI BACKEND");
      console.log(`Server running on port ${PORT}`);
      console.log(`http://localhost:${PORT}`);
      console.log("--------------------------------");
    });

    server.on("error", (error) => {
      console.error("SERVER ERROR:", error.message);
    });

  } catch (error) {
    console.error("BACKEND STARTUP ERROR:", error);
    process.exit(1);
  }
};

startServer();
