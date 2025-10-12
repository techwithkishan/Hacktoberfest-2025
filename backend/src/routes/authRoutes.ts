import express from 'express';
import { register, login, getProfile } from '../controllers/authController';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected route
router.get('/profile', authMiddleware, getProfile);

export default router;