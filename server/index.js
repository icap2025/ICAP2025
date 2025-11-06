const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables first
dotenv.config();

// Disable mongoose buffering for serverless
mongoose.set('bufferCommands', false);

// MongoDB connection with proper caching
let cachedConnection = null;

const connectDB = async () => {
  // If we have a cached connection and it's connected, use it
  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log('✅ Using existing MongoDB connection');
    return cachedConnection;
  }

  // If connection is in progress, wait for it
  if (mongoose.connection.readyState === 2) {
    console.log('⏳ Waiting for MongoDB connection...');
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('MongoDB connection timeout'));
      }, 10000);
      
      mongoose.connection.once('connected', () => {
        clearTimeout(timeout);
        resolve();
      });
      
      mongoose.connection.once('error', (err) => {
        clearTimeout(timeout);
        reject(err);
      });
    });
    cachedConnection = mongoose.connection;
    return cachedConnection;
  }

  try {
    console.log('🔌 Establishing new MongoDB connection...');
    
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 1,
    };

    const conn = await mongoose.connect(process.env.MONGO_URI, opts);
    cachedConnection = conn.connection;
    console.log('✅ MongoDB connected successfully');
    
    return cachedConnection;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    cachedConnection = null;
    throw error;
  }
};

// Load app after ensuring connection
let app = null;

// Handler function for Vercel
module.exports = async (req, res) => {
  try {
    // Ensure database is connected BEFORE any operations
    await connectDB();
    
    // Load app once after connection is established
    if (!app) {
      app = require('./src/app');
    }
    
    // Handle the request
    return app(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Server error. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
