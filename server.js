require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

const app = express();

// Use environment variables for MongoDB URI and secret code
const mongoURI = process.env.MONGODB_URI;
const port = process.env.PORT || 5000; // Default to 5000 if PORT is not set
const secretCode = process.env.SECRET_CODE;

// MongoDB connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use('/api/auth', authRoutes); // Auth routes

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
