import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// JWT Secret (should be in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Interface to extend Request with user data
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    username: string;
  };
}

// Middleware to verify JWT token
export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'Access denied. No token provided.'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Invalid token.'
    });
  }
};

// Function to generate JWT token
export const generateToken = (payload: { id: string; username: string }) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

export default {
  verifyToken,
  generateToken
};
