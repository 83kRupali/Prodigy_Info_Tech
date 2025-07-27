
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import Employee from "../models/EmployeeInfo.js"; // 🔥 IMPORT EMPLOYEE MODEL

dotenv.config();
const router = express.Router();

// 🔐 JWT Token Generator
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// ➕ SIGNUP
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Received signup data:", req.body);

  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ username, email, password });
    await user.save();
    console.log("User registered:", user);

    // 🧩 Create associated Employee record
    const employee = new Employee({
  name: username,
  email: email,
  employeeId: `EMP${Date.now()}`,
  designation: "Not Assigned",
  department: "Not Assigned",
  phone: "N/A",
  salary: 0,
  gender: "Other",
  profileImage: "https://as1.ftcdn.net/v2/jpg/01/65/63/94/1000_F_165639425_kRh61s497pV7IOPAjwjme1btB8ICkV0L.jpg", // ✅ fix here
  address: {
    city: "",
    state: "",
    country: ""
  }
});


    await employee.save(); // 💾 Save to DB
    console.log("Employee record created:", employee);

    res.status(201).json({ message: "User and Employee registered successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

// 🔑 LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = generateToken(user);
    res.status(200).json({ token, user: { username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }

  console.log("Login successful");
});

export default router;
