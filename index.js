
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Database Connection
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Mounting Mongoose App Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/opportunities', require('./routes/opportunityRoutes'));
app.use('/api/hours', require('./routes/hourRoutes'));

// Base health check
app.get('/', (req, res) => {
  res.json({ message: "OutcomeHub Mongo Engine Fully Operational" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server executing safely on port ${PORT}`);
});