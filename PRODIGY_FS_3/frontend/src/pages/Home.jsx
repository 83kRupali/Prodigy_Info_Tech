

// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  return (
    <div className="home">
      <h1 className="home-title">✨ Discover Trending Products</h1>
      <p className="home-subtitle">Carefully selected items, just for you.</p>

      <div className="product-grid">
        {products.map(product => (
          <div className="home-card" key={product._id}>
            <img src={product.image} alt={product.title} />
            <div className="home-card-body">
              <h2>{product.title}</h2>
              <p className="price">₹{product.price}</p>
              <Link to={`/product/${product._id}`} className="home-btn">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
