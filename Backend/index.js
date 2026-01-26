const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

const chatController = require('./controllers/chatController');
const User = require('./models/User');

const JWT_SECRET = "super_secret_key_123"; // In production, keep this in .env

const corsOptions = {
  origin: process.env.CLIENT_URI, // Your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // For cookies/sessions
};
app.use(cors(corsOptions));

// Middleware
// app.use(cors());
app.use(express.json());

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Routes
app.post('/api/chat', chatController.handleChat);

// 1. SIGNUP API
app.post('/api/signup', async (req, res) => {
  const { name, email, mobile, classLevel, googleId } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this Google email." });
    }

    // Create new user
    const newUser = new User({ name, email, mobile, classLevel, googleId });
    await newUser.save();

    // GENERATE TOKEN (Valid for 5 days)
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '5d' });

    res.status(201).json({ message: "Account created successfully!", user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// 2. LOGIN API
app.post('/api/login', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Account not found. Please Sign Up first." });
    }

    // GENERATE TOKEN (Valid for 5 days)
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '5d' });

    res.status(200).json({ message: "Login Successful", user, token });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// 3. NEW: PROFILE ROUTE (To verify token on Dashboard)
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token expired or invalid" });
    req.userId = decoded.id;
    next();
  });
};

app.get('/api/me', verifyToken, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json(user);
});

// Create a dummy user route for testing
// app.post('/api/user', async (req, res) => {
//     const User = require('./models/User');
//     const newUser = await User.create(req.body);
//     res.json(newUser);
// });

app.get('/', (req, res) => {
    res.send('Server is setup successfully');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));