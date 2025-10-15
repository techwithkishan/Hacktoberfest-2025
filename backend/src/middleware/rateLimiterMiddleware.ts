import { Request, Response, NextFunction } from 'express';

const { rateLimit } = require('express-rate-limit');

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    ipv6Subnet: 56,
    message: {
        status: 429,
        error: 'Too many requests. Please try again later.',
    },
    handler: (req: Request, res: Response, _next: NextFunction, options: any) => {
        console.warn(`[RATE-LIMIT] Blocked IP: ${req.ip}`);
        res.status(options.statusCode).json(options.message);
    },
});

export const authLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
        status: 429,
        error: 'Too many login attempts. Try again later.',
    },
    handler: (req: Request, res: Response, _next: NextFunction, options: any) => {
        console.warn(`[AUTH-LIMIT] Too many login attempts from IP: ${req.ip}`);
        res.status(options.statusCode).json(options.message);
    },
});

module.exports = {
    limiter,
    authLimiter
};