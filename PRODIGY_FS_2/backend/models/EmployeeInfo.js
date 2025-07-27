import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  designation: { type: String, required: true },
  department: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  salary: { type: Number, required: true },
  joinDate: { type: Date, default: Date.now },
  // profileImage: { type: String }, // URL or Base64

  profileImage:{type: String},

  address: {
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    country: { type: String, default: "" },
  },

  gender: { type: String, enum: ["Male", "Female", "Other"] },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

EmployeeSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// ✅ Prevent model overwrite error
const Employee = mongoose.models.Employee || mongoose.model("Employee", EmployeeSchema);

export default Employee;
