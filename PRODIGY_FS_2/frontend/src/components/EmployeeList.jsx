
// src/pages/EmployeeList.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./EmployeeList.css"; // Ensure CSS includes .employee-dept

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("https://prodigy-info-tech-3.onrender.com/api/employees");
        console.log("Fetched employees:", res.data);
        setEmployees(res.data);
      } catch (err) {
        console.error("Failed to fetch employees", err);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div className="employee-list">
      {employees.map((emp) => (
        <Link to={`/employees/${emp._id}`} key={emp._id} className="employee-card-link">
          <div className="employee-card">
            <div className="image-wrapper">
              <img
                src={emp.profileImage || "https://via.placeholder.com/150"}
                alt={emp.name}
                className="employee-image"
              />
            </div>
            <h4>{emp.name}</h4>
            <p>{emp.email}</p>
            <p className="employee-dept">
              {emp.department ? emp.department : "Department not assigned"}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default EmployeeList;
