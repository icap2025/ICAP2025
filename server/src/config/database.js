const mongoose = require('mongoose');

// Disable buffering globally - critical for serverless
mongoose.set('bufferCommands', false);

// MongoDB connection options optimized for serverless
const mongooseOptions = {
  bufferCommands: false, // Disable mongoose buffering
  serverSelectionTimeoutMS: 10000, // Increased to 10s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
  maxPoolSize: 10, // Maintain up to 10 socket connections
  minPoolSize: 1, // Minimum 1 connection
};

// Cache the MongoDB connection
let cachedConnection = null;

const connectDB = async () => {
  // If we have a cached connection and it's ready, use it
  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log('Using cached database connection');
    return cachedConnection;
  }

  try {
    // If connection is in progress, wait for it
    if (mongoose.connection.readyState === 2) {
      console.log('Database connection in progress, waiting...');
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Connection timeout')), 10000);
        mongoose.connection.once('connected', () => {
          clearTimeout(timeout);
          resolve();
        });
      });
      cachedConnection = mongoose.connection;
      return cachedConnection;
    }

    console.log('Establishing new database connection...');
    const conn = await mongoose.connect(process.env.MONGO_URI, mongooseOptions);
    
    cachedConnection = conn.connection;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    return cachedConnection;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    cachedConnection = null;
    throw error;
  }
};

module.exports = connectDB;
