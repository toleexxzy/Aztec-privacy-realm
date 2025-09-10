import { Request, Response, NextFunction } from 'express'

export interface CustomError extends Error {
  statusCode?: number
  details?: any
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Internal Server Error'

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400
    message = 'Validation Error'
  }

  // Mongoose duplicate key error
  if (err.name === 'MongoError' && (err as any).code === 11000) {
    statusCode = 400
    message = 'Duplicate field value'
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401
    message = 'Invalid token'
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401
    message = 'Token expired'
  }

  // Multer errors
  if (err.name === 'MulterError') {
    statusCode = 400
    if (err.message.includes('File too large')) {
      message = 'File size too large. Maximum size is 10MB.'
    } else if (err.message.includes('Unexpected field')) {
      message = 'Invalid file field'
    } else {
      message = err.message
    }
  }

  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  })

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { 
      details: err.details,
      stack: err.stack 
    })
  })
}