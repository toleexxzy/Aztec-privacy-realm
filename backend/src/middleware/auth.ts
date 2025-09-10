import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string
    email: string
    name: string
  }
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Access token required'
      })
    }

    const secretKey = process.env.JWT_SECRET || 'your-secret-key'
    
    const decoded = jwt.verify(token, secretKey) as any
    req.user = {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name
    }

    next()
  } catch (error) {
    return res.status(403).json({
      success: false,
      error: 'Invalid or expired token'
    })
  }
}

export const optionalAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (token) {
      const secretKey = process.env.JWT_SECRET || 'your-secret-key'
      const decoded = jwt.verify(token, secretKey) as any
      req.user = {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name
      }
    }

    next()
  } catch (error) {
    // Continue without authentication if token is invalid
    next()
  }
}