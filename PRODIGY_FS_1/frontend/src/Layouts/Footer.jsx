
// src/components/Footer.jsx
import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-section">
          <h3 className="footer-title">TeamTrackr</h3>
          <p className="footer-text">
            Streamlining your employee management with ease and efficiency.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/employees/create">Add Employee</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/signup">Signup</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p><FaEnvelope className="footer-icon" /> support@teamtrackr.com</p>
          <p><FaPhoneAlt className="footer-icon" /> +91 98765 43210</p>
          <p><FaMapMarkerAlt className="footer-icon" /> Pune, Maharashtra</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} TeamTrackr. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
