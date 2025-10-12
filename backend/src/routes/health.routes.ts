import express, {Request,Response} from 'express'


const router = express.Router();

router.get("/health", (req:Request, res:Response) => {
    res.status(200).json({
      status: 'OK',
      message: 'Hacktoberfest 2025 API is running! 🎃',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    });
  })

export default router