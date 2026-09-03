const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const eventRoutes = require('./src/routes/eventRoutes');
const { notFound, errorHandler } = require('./src/middleware/errorHandler');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Health Check
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Campus Event Manager Backend API is running'
  });
});

// API Routes
app.use('/api/events', eventRoutes);

// Custom Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
