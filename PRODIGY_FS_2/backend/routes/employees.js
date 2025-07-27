
// routes/employees.js
import express from "express";
import Employee from "../models/employeeInfo.js";

const router = express.Router();



import multer from "multer";
import path from "path";

// Setup storage for uploaded files
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique file name
  },
});
const upload = multer({ storage });


// GET all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find({}, "name email profileImage department");
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create employee

router.post("/", upload.single("profileImage"), async (req, res) => {
  try {
    const formData = req.body;

    // Manually add profileImage URL if a file was uploaded
    if (req.file) {
      formData.profileImage = `http://localhost:8080/uploads/${req.file.filename}`;
    }

    const emp = new Employee(formData);
    await emp.save();

    console.log("✅ Employee record created:", emp);
    res.status(201).json(emp);
  } catch (err) {
    console.error("❌ Error creating employee:", err);
    res.status(400).json({ message: err.message });
  }
});


// GET by ID
router.get("/:id", async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ message: "Employee not found" });
    res.json(emp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.put("/:id", upload.single("profileImage"), async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ message: "Employee not found" });

    const updatedData = req.body;

    // Handle profile image update
    if (req.file) {
      updatedData.profileImage = `http://localhost:8080/uploads/${req.file.filename}`;
    }

    // If address is nested like address[city], parse it manually
    if (req.body["address[city]"]) {
      updatedData.address = {
        city: req.body["address[city]"],
        state: req.body["address[state]"],
        pincode: req.body["address[pincode]"],
      };
    }

    Object.assign(emp, updatedData);
    emp.updatedAt = Date.now();
    await emp.save();

    res.json(emp);
  } catch (err) {
    console.error("❌ Error updating employee:", err);
    res.status(400).json({ message: err.message });
  }
});


// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ message: "Employee not found" });

    await emp.deleteOne();
    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
