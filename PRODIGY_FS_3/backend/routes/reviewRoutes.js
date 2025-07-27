const express = require('express');
const Review = require('../models/Review');
const Product = require('../models/Product');
const router = express.Router();

// POST /api/reviews
router.post('/', async (req, res) => {
  try {
    const { productId, userId, name, rating, comment } = req.body;
    const review = new Review({ product: productId, user: userId, name, rating, comment });
    const saved = await review.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit review', error: err.message });
  }
});

// GET /api/reviews/:productId
router.get('/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
});

module.exports = router;










