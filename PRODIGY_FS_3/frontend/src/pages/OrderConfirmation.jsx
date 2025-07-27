import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const order = state?.order;

  if (!order) return <p>No order data found.</p>;

  return (
    <div className="order-confirmation">
      <h2>🎉 Order Placed Successfully!</h2>
      <p>Order ID: <strong>{order._id}</strong></p>
      <p>Placed on: {new Date(order.createdAt).toLocaleString()}</p>

      <h3>Items Ordered:</h3>
      <ul>
        {order.orderItems.map(item => (
          <li key={item.id}>
            <img src={item.image} alt={item.title} width={50} />
            {item.title} - ₹{item.price} × {item.quantity}
          </li>
        ))}
      </ul>

      <h3>Total Paid: ₹{order.totalAmount}</h3>
      <h4>Shipping Details:</h4>
      <p>{order.shippingInfo.address}, {order.shippingInfo.city}</p>

      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default OrderConfirmation;
