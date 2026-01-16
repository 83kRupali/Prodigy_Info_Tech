import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import employeeRoutes from "./routes/employees.js";

dotenv.config();

const app = express();

// Environment variables
const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local dev (Vite)
      "https://prodigy-info-tech-p9ld.vercel.app" // deployed frontend
    ],
    credentials: true
  })
);

app.use(express.json());
app.use("/uploads", express.static("uploads"));

// MongoDB connection
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed:", error.message);
  });

// Routes
app.use("/auth", authRoutes);            // /auth/signup, /auth/login
app.use("/api/employees", employeeRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("👋 Welcome to the Employee Management API");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
