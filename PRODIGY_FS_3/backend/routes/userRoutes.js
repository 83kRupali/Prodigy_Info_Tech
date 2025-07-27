// 5. routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// router.post('/signup', async (req, res) => {
//   try {
//     const { name, email, password, username } = req.body;

//     if (!name || !email || !password || !username) {
//       return res.status(400).json({ error: 'All fields are required' });
//     }

//     const existing = await User.findOne({ username });
//     if (existing) return res.status(400).json({ error: 'Username already exists' });

//     const user = new User({ name, email, password, username });
//     await user.save();

//     res.json({ message: 'User registered successfully' });
//   } catch (err) {
//     console.error('Signup error:', err.message);
//     res.status(500).json({ error: 'Server error' });
//   }
// });



// routes/userRoutes.js


// routes/userRoutes.js
router.post('/signup', async (req, res) => {
  try {
    const { name, username, email, phone, address, password } = req.body;
    if (!name || !username || !email || !password)
      return res.status(400).json({ error: 'Required fields missing' });

    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ error: 'Username exists' });

    const user = new User({ name, username, email, phone, address, password });
    await user.save();

    res.json({ message: 'Signup successful' });
  } catch (err) {
    res.status(500).json({ error: 'Signup failed' });
  }
});



router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'User not found' });

  const isMatch = password === user.password; // use bcrypt in production!
  if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

  // Generate dummy token (replace with JWT for real apps)
  const token = 'dummy-token-' + Date.now();

  res.json({ message: 'Login successful', token });
});




// routes/userRoutes.js

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!id || id === 'null') return res.status(400).json({ message: 'Invalid user ID' });

  try {
    const user = await User.findById(id).select('-password'); // remove password
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;