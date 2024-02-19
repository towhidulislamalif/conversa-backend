import { NextFunction, Request, RequestHandler, Response } from 'express';

const asyncRequestHandler = (fn: RequestHandler): RequestHandler => {
  // This is the actual middleware function that will be executed for each request
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      // If an error occurs during the asynchronous operation, pass it to the next middleware
      next(err);
    });
  };
};

export default asyncRequestHandler;
