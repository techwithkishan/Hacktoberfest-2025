import {Request,Response,NextFunction} from 'express'

export const Middleware_404 = (req:Request, res:Response,next:NextFunction) => {
    res.status(404).json({
      error: 'Not Found',
      message: `Route ${req.originalUrl} not found`
    });
    next();
  }