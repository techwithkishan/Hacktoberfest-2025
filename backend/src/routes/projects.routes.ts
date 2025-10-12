import express from 'express'
import { getProjects } from '../controllers/projects.controller';

const router = express.Router();

router.get("/api/projects",getProjects)

export default router
