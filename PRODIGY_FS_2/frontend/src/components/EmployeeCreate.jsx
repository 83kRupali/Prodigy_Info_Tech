import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaEnvelope,
  FaPhone,
  FaUserTie,
  FaBuilding,
  FaMoneyBill,
  FaMapMarkerAlt,
  FaTransgender,
} from "react-icons/fa";
import "./EditEmployee.css"; // ✅ reuse same styling as EditEmployee

function EmployeeCreate() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    employeeId: `EMP${Date.now()}`,
    designation: "",
    department: "",
    phone: "",
    salary: "",
    gender: "Other",
    address: {
      city: "",
      state: "",
      country: "",
    },
  });

  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["city", "state", "country"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("employeeId", formData.employeeId);
    data.append("designation", formData.designation);
    data.append("department", formData.department);
    data.append("phone", formData.phone);
    data.append("salary", formData.salary);
    data.append("gender", formData.gender);

    data.append("city", formData.address.city);
    data.append("state", formData.address.state);
    data.append("country", formData.address.country);

    if (profileImage) {
      data.append("profileImage", profileImage);
    }

    try {
      await axios.post("https://prodigy-info-tech-3.onrender.com/api/employees", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Employee created successfully!");
      navigate("/employee");
    } catch (err) {
      console.error("Error creating employee:", err);
      alert("Failed to create employee");
    }
  };

  return (
    <div className="edit-employee-container">
      <div className="employee-edit-card">
        <h2>Create Employee</h2>
        <form className="edit-form" onSubmit={handleSubmit}>
         <div className="form-row">
  <label>Profile Image:</label>
  <div className="image-upload-container">
    <input
      type="file"
      name="profileImage"
      id="profileImage"
      accept="image/*"
      onChange={handleFileChange}
    />
    {preview && (
      <div className="image-preview">
        <img src={preview} alt="Preview" />
      </div>
    )}
  </div>
</div>




          <div className="form-row">
            <label><FaUserTie /> Name:</label>
            <input name="name" onChange={handleChange} required />
          </div>

          <div className="form-row">
            <label><FaEnvelope /> Email:</label>
            <input name="email" onChange={handleChange} required />
          </div>

          <div className="form-row">
            <label><FaUserTie /> Designation:</label>
            <input name="designation" onChange={handleChange} required />
          </div>

          <div className="form-row">
            <label><FaBuilding /> Department:</label>
            <input name="department" onChange={handleChange} required />
          </div>

          <div className="form-row">
            <label><FaPhone /> Phone:</label>
            <input name="phone" onChange={handleChange} required />
          </div>

          <div className="form-row">
            <label><FaMoneyBill /> Salary:</label>
            <input name="salary" type="number" onChange={handleChange} required />
          </div>

          <div className="form-row">
  <label><FaTransgender /> Gender:</label>
  <select name="gender" value={formData.gender} onChange={handleChange}>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Other">Other</option>
  </select>
</div>
          <div className="form-row">
            <label><FaMapMarkerAlt /> City:</label>
            <input name="city" onChange={handleChange} />
          </div>

          <div className="form-row">
            <label><FaMapMarkerAlt /> State:</label>
            <input name="state" onChange={handleChange} />
          </div>

          <div className="form-row">
            <label><FaMapMarkerAlt /> Country:</label>
            <input name="country" onChange={handleChange} />
          </div>

          {/* <div className="form-row">
            <label>Profile Image:</label>
            <input className="file-input" type="file" name="profileImage" accept="image/*" onChange={handleFileChange} />
          </div> */}

          <button className="edit-btn-submit" type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}

export default EmployeeCreate;
