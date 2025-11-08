const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/database');

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: [
    process.env.NEXT_PUBLIC_APP_FRONTEND_URL,
    "https://icap2025.sust.edu"
  ],
  methods:['GET','POST','PUT','DELETE','PATCH'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parser
app.use(cookieParser());

// Database connection middleware for serverless
// This ensures DB is connected before processing any request
app.use(async (req, res, next) => {
  try {
    // Wait for database connection to complete
    await connectDB();
    
    // Verify connection is actually ready
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database not ready');
    }
    
    next();
  } catch (error) {
    console.error('Database connection failed:', error.message);
    return res.status(503).json({
      success: false,
      message: 'Database connection failed. Please try again in a moment.'
    });
  }
});

// Test route - simple health check
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running!'
  });
});

// Database connection test route
app.get('/api/db-test', async (req, res) => {
  const mongoose = require('mongoose');
  try {
    const state = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    
    res.status(200).json({
      status: 'success',
      database: {
        state: states[state],
        readyState: state,
        host: mongoose.connection.host || 'not connected',
        name: mongoose.connection.name || 'not connected'
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/payment', paymentRoutes);

// Handle 404 - Route not found (use /:path(*) instead of * for Express 5.x compatibility)
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

// Global error handler
app.use(errorHandler);

module.exports = app;