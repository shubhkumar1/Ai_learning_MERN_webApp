const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const chatController = require('./controllers/chatController');

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Routes
app.post('/api/chat', chatController.handleChat);

// Create a dummy user route for testing
app.post('/api/user', async (req, res) => {
    const User = require('./models/User');
    const newUser = await User.create(req.body);
    res.json(newUser);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));