// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      setError('Please login first');
      return;
    }
    setUser(storedUser);

    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/user/${storedUser._id}`);
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch orders');
      }
    };

    fetchOrders();
  }, []);

  if (error) return <p className="error">{error}</p>;

  return (
    <div className="profile-container">
      <h2>Welcome, {user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Country:</strong> {user.country || 'N/A'}</p>
      <p><strong>Address:</strong> {user.address || 'N/A'}</p>

      <h3>Your Orders</h3>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <ul className="order-list">
          {orders.map(order => (
            <li key={order._id} className="order-card">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Total:</strong> ₹{order.summary?.total}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Items:</strong></p>
              <ul>
                {order.items?.map((item, idx) => (
                  <li key={idx}>
                    <img src={item.image} alt={item.title} width="50" />
                    {item.title} × {item.quantity} – ₹{item.price}
                  </li>
                ))}
              </ul>
              <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;
