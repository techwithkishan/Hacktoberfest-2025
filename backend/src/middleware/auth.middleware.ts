import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Get token from header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // Check if no token
  if (!token) {
    res.status(401).json({ success: false, message: 'No token, authorization denied' });
    return;
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    
    // Attach user from the payload to the request object
    (req as any).user = decoded.user;
    
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Token is not valid' });
  }
};