const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

const app = require('./src/app');

// Database connection
const DB = process.env.MONGO_URI;

// Connect to MongoDB (Vercel will keep connection warm)
if (mongoose.connection.readyState === 0) {
  mongoose
    .connect(DB)
    .then(() => console.log('✅ DB connection successful!'))
    .catch((err) => {
      console.log('❌ DB connection error:', err.message);
    });
}

// Export the Express app for Vercel serverless
module.exports = app;
