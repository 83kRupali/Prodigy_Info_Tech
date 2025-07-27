// 4. routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');


router.post('/', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json({ message: 'Product created', product });
});


// GET /api/products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).send('Not found');
  res.json(product);
});

module.exports = router;