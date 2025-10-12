import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Hash password
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

// Compare password
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

// Generate JWT token
export const generateToken = (userId: string, email: string): string => {
  return jwt.sign(
    { 
      userId: userId,
      email: email
    },
    process.env.JWT_SECRET || 'fallback-secret-key',
    { expiresIn: '24h' }
  );
};