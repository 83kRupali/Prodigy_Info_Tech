// 

// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
 // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // 🧠 Link to user

  customer: {
    name: String,
    email: String,
    phone: String,
    address: String
  },

  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      title: String,
      image: String,
      price: Number,
      quantity: Number
    }
  ],

  summary: {
    subtotal: Number,
    shipping: Number,
    tax: Number,
    total: Number
  },

  paymentMode: { type: String, default: 'Cash on Delivery' },
  status: { type: String, default: 'Pending' },
  orderDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
