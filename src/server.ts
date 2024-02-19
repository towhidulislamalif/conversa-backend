/* eslint-disable no-console */

import { Server } from 'http';
import app from '.';
import config from './config';
import connectToDatabase from './database';

let server: Server;

// Function to start the server
const startServer = () => {
  const PORT = config.port;
  server = app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT} 👂`);
  });
};

// Main function to connect to the database and start the server
const main = async () => {
  try {
    await connectToDatabase();
    startServer();
  } catch (error) {
    console.error('Error connecting to the database or starting the server:', error);
    process.exit(1);
  }
};

// Execute the main function to initialize the application
main();

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);

  // If the server is running, close it before exiting the process
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    // If the server is not running, exit the process directly
    process.exit(1);
  }
});
