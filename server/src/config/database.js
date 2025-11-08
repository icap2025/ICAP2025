const mongoose = require('mongoose');

// Disable buffering globally - critical for serverless
mongoose.set('bufferCommands', false);
mongoose.set('strictQuery', false);

// Simple MongoDB connection options
const mongooseOptions = {
  bufferCommands: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
};

// Track connection promise to prevent multiple simultaneous connections
let connectionPromise = null;

const connectDB = async () => {
  // If already connected, return immediately
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // If connection is in progress, wait for it
  if (connectionPromise) {
    return connectionPromise;
  }

  try {
    console.log('🔄 Connecting to MongoDB...');
    
    // Store the connection promise
    connectionPromise = mongoose.connect(process.env.MONGO_URI, mongooseOptions);
    
    // Wait for connection to complete
    await connectionPromise;
    
    console.log('✅ MongoDB Connected:', mongoose.connection.host);
    console.log('📊 Database:', mongoose.connection.name);
    
    // Reset promise after successful connection
    connectionPromise = null;
    
    return mongoose.connection;
    
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    connectionPromise = null; // Reset on error
    throw error;
  }
};

// Connection event listeners
mongoose.connection.on('connected', () => {
  console.log('📡 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('📴 Mongoose disconnected from MongoDB');
});

module.exports = connectDB;
