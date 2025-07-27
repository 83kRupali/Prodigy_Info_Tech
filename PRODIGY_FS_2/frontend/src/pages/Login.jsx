
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa";
import { saveAuth } from "../utils/auth";
import "./Auth.css";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/auth/login", formData);
      saveAuth(res.data.token);
      navigate("/employee");
    } catch (err) {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <h2 className="brand-name">TeamTrackr</h2>
        <h3>Login to Your Account</h3>
        <form onSubmit={handleSubmit} className="form-with-icons">
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="hover-button">Login</button>
        </form>
        <p>
          Don’t have an account? <a href="/signup">Create one</a>
        </p>
      </div>
    </div>
  );
}
