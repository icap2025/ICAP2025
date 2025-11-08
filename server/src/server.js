const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Load environment variables
dotenv.config();

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...',err);
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    // Wait for database connection before starting server
    await connectDB();
    
    // Start server only after DB is connected
    const port = process.env.PORT || 5000;
    const server = app.listen(port, () => {
      console.log(`🚀 Server running on port ${port} in ${process.env.NODE_ENV} mode`);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      console.log('UNHANDLED REJECTION! 💥 Shutting down...');
      console.log(err.name, err.message);
      server.close(() => {
        process.exit(1);
      });
    });

    // Handle SIGTERM
    process.on('SIGTERM', () => {
      console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
      server.close(() => {
        console.log('💥 Process terminated!');
      });
    });
    
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();