import { Response } from 'express';

// Define the structure of the API response
interface APIResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
}

const sendAPIResponse = <T>(res: Response, options: APIResponse<T>) => {
  const { success, statusCode = 200, message, data } = options;

  res.status(statusCode).json({
    success,
    message,
    data,
  });
};

export default sendAPIResponse;
