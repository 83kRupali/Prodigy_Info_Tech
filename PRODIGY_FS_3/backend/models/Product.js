// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String,
  category: String,
  countInStock: { type: Number, default: 0 }
});

module.exports = mongoose.model('Product', productSchema);
