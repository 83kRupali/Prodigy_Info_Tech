const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

// POST /api/orders
router.post('/', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const saved = await newOrder.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Order creation failed', error });
  }
});

// GET /api/orders
router.get('/', async (req, res) => {
  try {
    const all = await Order.find().sort({ orderDate: -1 });
    res.json(all);
  } catch (err) {
    res.status(500).json({ message: 'Fetching orders failed' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching order' });
  }
});



// routes/orderRoutes.js
// routes/orderRoutes.js
router.get('/user/:email', async (req, res) => {
  try {
    const orders = await Order.find({ 'customer.email': req.params.email });
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});


module.exports = router; // ✅ must be CommonJS export
