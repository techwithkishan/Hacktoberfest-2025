import express from 'express'
import { getContributors } from '../controllers/contributors.controller';

const router = express.Router();

router.get("/api/contributors",getContributors)

export default router