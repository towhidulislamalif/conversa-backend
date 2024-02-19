import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from './config';
import errorHandler from './middleware/errorHandler.middleware';

// Create an Express application
const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Parse JSON requests
app.use(express.json());

// Enable CORS with specified options from the configuration
app.use(
  cors({
    origin: config.origin || '*',
    credentials: true,
  }),
);

// Parse cookies
app.use(cookieParser());

// Define a simple route for the root endpoint
app.get('/', (_, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Chat App API 😊',
  });
});

// Not found route
app.use((_, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message:
      'The requested resource was not found on the server. Please check the URL and try again.',
  });
});

// Global error handler middleware
app.use(errorHandler);

export default app;
