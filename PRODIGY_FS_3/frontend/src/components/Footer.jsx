import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>ShopEase</h3>
        <p>Bringing ease to your shopping experience.</p>
        <ul className="socials">
          <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
          <li><a href="#"><i className="fab fa-twitter"></i></a></li>
          <li><a href="#"><i className="fab fa-instagram"></i></a></li>
          <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
