//importing express framework
import express from 'express';
import bcrypt from 'bcryptjs';
//imporitng json web token
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

//calling express router 
const router = express.Router();

//Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    //checking if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    console.log('error:', error); //consoling error
    res.status(500).json({ error: 'Registration failed' });
  }
});

//login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid email' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

    //creating jwt token
    const token = jwt.sign(
  { id: user._id, username: user.username },
  process.env.JWT_SECRET,
  { expiresIn: '1d' }
);

    res.json({ token, username: user.username });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;
