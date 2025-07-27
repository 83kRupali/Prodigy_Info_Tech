// seed.js
const mongoose = require('mongoose');
const Product = require('../models/Product.js'); // ✅ Fixed the quote

const products = [
  {
    title: "Wireless Earbuds",
    description: "High-quality wireless earbuds with noise cancellation.",
    price: 2999,
    image: "https://m.media-amazon.com/images/I/61a4M+1brkL.AC_SX500.jpg",
    category: "Electronics",
    countInStock: 15
  },
  {
    title: "Men's Running Shoes",
    description: "Lightweight and comfortable shoes for daily running.",
    price: 2499,
    image: "https://m.media-amazon.com/images/I/613jfAH1TuL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Footwear",
    countInStock: 10
  },
  {
    title: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with deep bass.",
    price: 1999,
    image: "https://m.media-amazon.com/images/I/51UhwaQXCpL.AC_SX500.jpg",
    category: "Electronics",
    countInStock: 20
  },
  {
    title: "Smart Watch",
    description: "Fitness tracking smartwatch with heart rate monitor.",
    price: 3499,
    image: "https://m.media-amazon.com/images/I/81cZI+Hs9vL._AC_UY327_FMwebp_QL65_.jpg",
    category: "Wearables",
    countInStock: 8
  },
  {
    title: "Office Chair",
    description: "Ergonomic office chair with adjustable height and lumbar support.",
    price: 5499,
    image: "https://m.media-amazon.com/images/I/71zC-swECpL._SX679_.jpg",
    category: "Furniture",
    countInStock: 5
  },
  {
    title: "Gaming Mouse",
    description: "Ergonomic gaming mouse with RGB lighting and customizable buttons.",
    price: 1299,
    image: "https://m.media-amazon.com/images/I/61wayiQYu2L._AC_UY327_FMwebp_QL65_.jpg",
    category: "Electronics",
    countInStock: 25
  },
  {
    title: "Yoga Mat",
    description: "Non-slip yoga mat for daily workouts and fitness routines.",
    price: 999,
    image: "https://m.media-amazon.com/images/I/71M297JjglL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Fitness",
    countInStock: 30
  },
  {
    title: "Leather Wallet",
    description: "Premium leather wallet with multiple card slots and compartments.",
    price: 799,
    image: "https://m.media-amazon.com/images/I/71Arad6dB1L._AC_UL480_FMwebp_QL65_.jpg",
    category: "Accessories",
    countInStock: 50
  },
  {
    title: "LED Desk Lamp",
    description: "Adjustable LED desk lamp with touch control and USB charging port.",
    price: 1599,
    image: "https://m.media-amazon.com/images/I/51DcV4YJw2L._AC_UL480_FMwebp_QL65_.jpg",
    category: "Furniture",
    countInStock: 12
  },
  {
    title: "Women's Handbag",
    description: "Elegant women's handbag made from eco-leather, ideal for all occasions.",
    price: 2299,
    image: "https://m.media-amazon.com/images/I/71nu6T+EUBL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Fashion",
    countInStock: 18
  },
  {
    title: "Kitchen Knife Set",
    description: "Professional stainless steel kitchen knife set with wooden block.",
    price: 1899,
    image: "https://m.media-amazon.com/images/I/71T6JI60z-L._AC_UL480_FMwebp_QL65_.jpg",
    category: "Home & Kitchen",
    countInStock: 10
  },
  {
    title: "Noise Cancelling Headphones",
    description: "Over-ear headphones with active noise cancellation and long battery life.",
    price: 4999,
    image: "https://m.media-amazon.com/images/I/51CnDMbXZzL._AC_UY327_FMwebp_QL65_.jpg",
    category: "Electronics",
    countInStock: 7
  },
  {
    title: "Backpack",
    description: "Durable and water-resistant backpack with multiple compartments.",
    price: 1499,
    image: "https://m.media-amazon.com/images/I/61EEkLI9dML._AC_UY327_FMwebp_QL65_.jpg",
    category: "Bags",
    countInStock: 22
  },
  {
    title: "Electric Kettle",
    description: "1.5-liter electric kettle with auto shut-off and stainless steel body.",
    price: 1099,
    image: "https://m.media-amazon.com/images/I/71Tck+rJ2SL._AC_UY327_FMwebp_QL65_.jpg",
    category: "Home Appliances",
    countInStock: 16
  },
  {
    title: "Sunglasses",
    description: "Polarized UV-protection sunglasses with a modern frame design.",
    price: 899,
    image: "https://m.media-amazon.com/images/I/41yqM8NP0qL._SX679_.jpg",
    category: "Accessories",
    countInStock: 40
  },
  {
    title: "Laptop Stand",
    description: "Adjustable aluminum laptop stand for better posture and ventilation.",
    price: 1799,
    image: "https://images.pexels.com/photos/4974914/pexels-photo-4974914.jpeg",
    category: "Accessories",
    countInStock: 14
  },
  {
    title: "Cotton Bedsheet",
    description: "King-size soft cotton bedsheet with two pillow covers.",
    price: 1299,
    image: "https://m.media-amazon.com/images/I/81FQTXReA9L._AC_UL480_FMwebp_QL65_.jpg",
    category: "Home & Living",
    countInStock: 19
  },
  {
    title: "Table Lamp",
    description: "Stylish table lamp perfect for bedside or study use.",
    price: 899,
    image: "https://m.media-amazon.com/images/I/71-TMoSFo-L._AC_UL480_FMwebp_QL65_.jpg",
    category: "Furniture",
    countInStock: 13
  },
  {
    title: "Wireless Keyboard",
    description: "Slim wireless keyboard compatible with laptops and tablets.",
    price: 1399,
    image: "https://m.media-amazon.com/images/I/61bw-BHgEsL._AC_UY327_FMwebp_QL65_.jpg",
    category: "Electronics",
    countInStock: 21
  },
  {
    title: "Travel Mug",
    description: "Insulated stainless steel mug for hot and cold beverages.",
    price: 699,
    image: "https://m.media-amazon.com/images/I/61P1r6I0I-L._AC_UL480_FMwebp_QL65_.jpg",
    category: "Kitchenware",
    countInStock: 35
  }
];



mongoose.connect('mongodb://localhost:27017/Task3', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected');
  return Product.insertMany(products);
})
.then(() => {
  console.log('✅ Product data inserted successfully');
  process.exit();
})
.catch((err) => {
  console.error('❌ Error inserting product data:', err);
  process.exit(1);
});
