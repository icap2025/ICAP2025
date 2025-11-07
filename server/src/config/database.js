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

// Cache the MongoDB connection for serverless
let isConnected = false;

const connectDB = async () => {
  // If already connected, return
  if (isConnected && mongoose.connection.readyState === 1) {
    console.log('📊 Using existing database connection');
    return;
  }

  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, mongooseOptions);
    
    isConnected = true;
    console.log('✅ MongoDB Connected:', mongoose.connection.host);
    console.log('📊 Database:', mongoose.connection.name);
    
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    isConnected = false;
    throw error;
  }
};

// Connection event listeners
mongoose.connection.on('connected', () => {
  isConnected = true;
  console.log('📡 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  isConnected = false;
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  console.log('📴 Mongoose disconnected from MongoDB');
});

module.exports = connectDB;
