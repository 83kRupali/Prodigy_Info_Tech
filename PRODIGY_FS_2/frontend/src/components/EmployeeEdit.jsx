
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaEnvelope,
  FaPhone,
  FaUserTie,
  FaBuilding,
  FaMoneyBill,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./EditEmployee.css";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    salary: "",
    profileImage: "",
    address: {
      city: "",
      state: "",
      country: "",
    },
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/employees/${id}`).then((res) => {
      setForm(res.data);
      setPreview(res.data.profileImage);
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profileImage" && files.length > 0) {
      const file = files[0];
      setForm((prev) => ({ ...prev, profileImage: file }));
      setPreview(URL.createObjectURL(file));
    } else if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (let key in form) {
      if (key === "profileImage") {
        if (form[key] instanceof File) {
          formData.append("profileImage", form[key]);
        }
      } else if (key === "address" && typeof form[key] === "object") {
        for (let subKey in form[key]) {
          formData.append(`address[${subKey}]`, form[key][subKey]);
        }
      } else {
        formData.append(key, form[key]);
      }
    }

    try {
      await axios.put(`http://localhost:8080/api/employees/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Employee updated!");
      navigate(`/employees/${id}`);
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update employee.");
    }
  };

  return (
    <div className="edit-employee-container">
      <div className="employee-edit-card">
        <h2>Edit Employee</h2>
        <form className="edit-form" onSubmit={handleSubmit}>
          <div className="image-preview">
            <img
              src={preview || "https://via.placeholder.com/160"}
              alt="Preview"
            />
          </div>

          <div className="form-row">
            <label><FaUserTie /> Name:</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label><FaEnvelope /> Email:</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label><FaPhone /> Phone:</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label><FaUserTie /> Designation:</label>
            <input
              name="designation"
              value={form.designation}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label><FaBuilding /> Department:</label>
            <input
              name="department"
              value={form.department}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label><FaMoneyBill /> Salary:</label>
            <input
              name="salary"
              value={form.salary}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label><FaMapMarkerAlt /> City:</label>
            <input
              name="address.city"
              value={form.address?.city || ""}
              onChange={handleChange}
              placeholder="Enter city"
            />
          </div>

          <div className="form-row">
            <label><FaMapMarkerAlt /> State:</label>
            <input
              name="address.state"
              value={form.address?.state || ""}
              onChange={handleChange}
              placeholder="Enter state"
            />
          </div>

          <div className="form-row">
            <label><FaMapMarkerAlt /> Country:</label>
            <input
              name="address.country"
              value={form.address?.country || ""}
              onChange={handleChange}
              placeholder="Enter country"
            />
          </div>

          <div className="form-row">
            <label>Profile Image:</label>
            <input
              className="file-input"
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <button className="edit-btn-submit" type="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditEmployee;
