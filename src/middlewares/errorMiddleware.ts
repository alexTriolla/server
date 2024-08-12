import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/AppError';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || 'An unexpected error occurred';
  const stack = process.env.NODE_ENV === 'production' ? null : err.stack;

  res.status(statusCode).json({
    message,
    stack,
  });
};
