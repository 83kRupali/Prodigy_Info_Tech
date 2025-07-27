// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// import routes
import authRoutes from "./routes/auth.js";
import employeeRoutes from "./routes/employees.js"; // you'll create this file too

dotenv.config();

const app = express();

// Environment variables
const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/Task1";

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// MongoDB Connection
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/auth", authRoutes);         // POST /auth/signup and /auth/login
// app.use("/api", employeeRoutes);      // CRUD routes for employee data
app.use("/api/employees", employeeRoutes);


// Root route
app.get("/", (req, res) => {
  res.send("👋 Welcome to the Employee Management API");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});









