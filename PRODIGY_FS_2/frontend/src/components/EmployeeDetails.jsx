
// EmployeeDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaEnvelope, FaPhone, FaUserTie, FaBuilding, FaMoneyBill,
  FaTransgender, FaCheckCircle, FaMapMarkerAlt, FaIdBadge
} from "react-icons/fa";
import "./EmployeeDetails.css";

function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [emp, setEmp] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`https://prodigy-info-tech-3.onrender.com/api/employees/${id}`);
        setEmp(res.data);
      } catch (err) {
        console.error("Error fetching employee", err);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleEdit = () => {
    navigate(`/employees/${id}/edit`);
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this employee?");
    if (!confirm) return;

    try {
      await axios.delete(`https://prodigy-info-tech-3.onrender.com/api/employees/${id}`);
      alert("Employee deleted successfully!");
      navigate("/employee");
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  if (!emp) return <p className="loading">Loading employee details...</p>;

  return (
    <div className="employee-details-wrapper">
      <div className="employee-details-card">
        <div className="employee-header">
          <img
            src={emp.profileImage || "https://via.placeholder.com/160"}
            className="employee-profile-img"
            alt={emp.name}
          />
          <h2 className="employee-name">{emp.name}</h2>
        </div>

        <div className="info-group">
          <p><FaIdBadge /> <strong>Employee ID:</strong> {emp.employeeId}</p>
          <p><FaUserTie /> <strong>Designation:</strong> {emp.designation}</p>
          <p><FaBuilding /> <strong>Department:</strong> {emp.department}</p>
          <hr />
          <p><FaEnvelope /> <strong>Email:</strong> {emp.email}</p>
          <p><FaPhone /> <strong>Phone:</strong> {emp.phone}</p>
          <p><FaMoneyBill /> <strong>Salary:</strong> ₹{emp.salary.toLocaleString()}</p>
          <p><strong>Join Date:</strong> {new Date(emp.joinDate).toLocaleDateString()}</p>
          <hr />
          <p><FaTransgender /> <strong>Gender:</strong> {emp.gender}</p>
          <p><FaCheckCircle /> <strong>Status:</strong> {emp.status}</p>
          <p><FaMapMarkerAlt /> <strong>City:</strong> {emp.address?.city || "N/A"}</p>
          <p><FaMapMarkerAlt /> <strong>State:</strong> {emp.address?.state || "N/A"}</p>
          <p><FaMapMarkerAlt /> <strong>Country:</strong> {emp.address?.country || "N/A"}</p>
        </div>

        <div className="btn-group">
          <button className="btn edit-btn" onClick={handleEdit}>Edit</button>
          <button className="btn delete-btn" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
