import express from 'express'
import { getStats } from '../controllers/stats.controller';
const router = express.Router();

router.get("/api/stats",getStats)

export default router
