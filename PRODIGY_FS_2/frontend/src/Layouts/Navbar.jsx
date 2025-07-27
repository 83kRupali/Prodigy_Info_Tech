import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUserPlus,
  FaUser,
  FaSignOutAlt,
  FaAddressCard,
} from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("userId");

    setIsAuthenticated(!!token);
    setUserId(id);
  }, [location]); // re-check when route changes

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    setUserId(null);
    navigate("/login");
  };

  return (
    <nav className="navbar-light">
      <div className="navbar-left">
        <h2 className="brand">TeamTrackr</h2>

        {/* ✅ Show only when logged in */}
        {isAuthenticated && (
          <div className="nav-links">
            <Link to="/employee" className="nav-link">
              <FaHome className="icon" /> Home
            </Link>
            <Link to="/employees/create" className="nav-link">
              <FaUserPlus className="icon" /> Add Employee
            </Link>
          </div>
        )}
      </div>

      <div className="navbar-right">
        {/* ✅ Logged-in: show profile & logout */}
        {isAuthenticated ? (
          <div className="profile-dropdown">
            <FaAddressCard className="profile-icon" />
            <div className="dropdown-menu">
              <Link to={`/employees/${userId}/profile`} className="dropdown-item">
                <FaUser className="icon" /> Profile
              </Link>
              <button onClick={handleLogout} className="dropdown-item">
                <FaSignOutAlt className="icon" /> Logout
              </button>
            </div>
          </div>
        ) : (
          // ❌ Only show Login/Signup if NOT authenticated
          <div className="nav-links">
            <Link to="/login" className="nav-link">
              <FaUser className="icon" /> Login
            </Link>
            <Link to="/signup" className="nav-link">
              <FaUserPlus className="icon" /> Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
