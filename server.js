const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/users');

dotenv.config(); // Load .env variables

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON requests

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.log('❌ MongoDB Connection Error:', err.message));

// Basic root route
app.get('/', (req, res) => {
  res.send('Welcome to the User Registration Backend API');
});

// Use user routes
app.use('/api/users', userRoutes);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
});
