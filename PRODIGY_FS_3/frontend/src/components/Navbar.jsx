


import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">ShopEase</div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/checkout">Checkout</Link>
        <Link to="/profile">Profile</Link> {/* ✅ New Profile link */}
      </div>

      <div className="navbar-auth">
        <Link to="/login" className="auth-button">Login</Link>
        <Link to="/signup" className="auth-button signup">Signup</Link>
      </div>
    </nav>
  );
};

export default Navbar;
