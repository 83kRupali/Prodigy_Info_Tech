
// src/pages/Product.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        setProducts(res.data);
        const uniqueCategories = [...new Set(res.data.map(p => p.category))];
        setCategories(uniqueCategories);
      })
      .catch(err => console.error('Product fetch failed:', err));
  }, []);

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter(product => product.category === selectedCategory);

  return (
    <div className="product-page">
      <h1 className="product-title">🛍️ Explore Our Products</h1>

      {/* Category Pills */}
      <div className="category-pills">
        <button
          className={selectedCategory === 'All' ? 'pill active' : 'pill'}
          onClick={() => setSelectedCategory('All')}
        >
          All
        </button>
        {categories.map((cat, idx) => (
          <button
            key={idx}
            className={selectedCategory === cat ? 'pill active' : 'pill'}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filteredProducts.length === 0 ? (
          <p className="no-products">No products found in this category.</p>
        ) : (
          filteredProducts.map(product => (
            <div className="product-card" key={product._id}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>₹{product.price}</p>
              <Link to={`/product/${product._id}`} className="view-button">View Details</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;














