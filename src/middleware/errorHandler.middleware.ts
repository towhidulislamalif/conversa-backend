/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import APIError from '../utils/APIError';
import config from '../config';

interface ErrorResponse {
  success: boolean;
  statusCode: number;
  message: string;
  stack?: string | null;
}

const errorHandler: ErrorRequestHandler = (err, _, res, _next) => {
  // Default values for status code and message
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  if (err instanceof APIError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  const response: ErrorResponse = {
    success: false,
    statusCode,
    message,
    stack: config.node_env === 'development' ? err.stack : null,
  };

  res.status(statusCode).json(response);
};

export default errorHandler;
