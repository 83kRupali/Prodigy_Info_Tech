
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Checkout.css';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isBuyNow = new URLSearchParams(location.search).get('buyNow');

  // 🔁 Initialize from localStorage but also store in state
  const [cartItems, setCartItems] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    paymentMode: 'Cash on Delivery',
  });

  useEffect(() => {
    const storedItems = isBuyNow
      ? JSON.parse(localStorage.getItem('buyNow')) || []
      : JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedItems);
  }, [isBuyNow]);

  // 🧮 Calculate price
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = parseFloat((subtotal * 0.18).toFixed(2));
  const total = subtotal + shipping + tax;

  // 📝 Handle input
  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔁 Handle quantity update
  const handleQuantityChange = (index, newQty) => {
    if (newQty < 1) return; // optional: prevent 0 qty
    const updatedItems = [...cartItems];
    updatedItems[index].quantity = parseInt(newQty);
    setCartItems(updatedItems);
    localStorage.setItem(isBuyNow ? 'buyNow' : 'cart', JSON.stringify(updatedItems));
  };

  // ✅ Handle place order
  const handlePlaceOrder = async () => {
    const order = {
      customer: form,
      paymentMode: form.paymentMode,
      items: cartItems.map(p => ({
        productId: p._id,
        title: p.title,
        image: p.image,
        price: p.price,
        quantity: p.quantity
      })),
      summary: { subtotal, shipping, tax, total }
    };

    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });

      if (res.ok) {
        localStorage.removeItem(isBuyNow ? 'buyNow' : 'cart');
        //navigate('/thankyou');
        alert("Order is Successful👍")
        navigate('/');
      } else {
        const err = await res.json();
        alert("Order failed: " + err.message);
      }
    } catch (err) {
      console.error("Error placing order:", err);
    }
  };

  return (
    <div className="checkout-container">
      <h2>🧾 Checkout & Billing</h2>

      <div className="bill-card">
        <h3>📋 Customer Information</h3>
        <input type="text" name="name" value={form.name} onChange={handleInput} placeholder="Full Name" />
        <input type="email" name="email" value={form.email} onChange={handleInput} placeholder="Email" />
        <input type="text" name="phone" value={form.phone} onChange={handleInput} placeholder="Phone Number" />
        <textarea name="address" value={form.address} onChange={handleInput} placeholder="Full Address"></textarea>
        <select name="paymentMode" value={form.paymentMode} onChange={handleInput}>
          <option>Cash on Delivery</option>
          <option>UPI</option>
          <option>Credit Card</option>
        </select>

        <h3>🛍️ Order Summary</h3>
        <table className="bill-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, idx) => (
              <tr key={idx}>
                <td><img src={item.image} alt={item.title} className="checkout-img" /></td>
                <td>{item.title}</td>
                <td>₹{item.price}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(idx, e.target.value)}
                    style={{ width: "50px" }}
                  />
                </td>
                <td>₹{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="checkout-total">
          <p>Subtotal: ₹{subtotal}</p>
          <p>Shipping: ₹{shipping}</p>
          <p>Tax (18%): ₹{tax}</p>
          <h3>Total: ₹{total}</h3>
        </div>

        <button className="checkout-btn" onClick={handlePlaceOrder}>✅ Place Order</button>
      </div>
    </div>
  );
};

export default Checkout;
