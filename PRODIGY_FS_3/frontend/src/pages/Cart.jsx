

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (id, type) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        const updatedQuantity = type === 'increase' ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: updatedQuantity > 0 ? updatedQuantity : 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const getTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h2>Your Cart</h2>
        <div className="empty-cart">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="Empty Cart"
          />
          <p>Your cart is currently empty.</p>
          <Link to="/" className="shop-btn">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <div className="cart-list">
        {cartItems.map(item => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.title} />
            <div className="cart-details">
              <h4>{item.title}</h4>
              <p>Price: ₹{item.price}</p>
              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(item.id, 'decrease')}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.id, 'increase')}>+</button>
              </div>
              <button className="remove-btn" onClick={() => handleRemove(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total: ₹{getTotal()}</h3>
        <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>
      </div>
    </div>
  );
};

export default Cart;








