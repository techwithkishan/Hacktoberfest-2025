import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import statsRouter from "./routes/stats.routes"
import contributorsRouter from "./routes/contributors.routes"
import projectRouter from "./routes/projects.routes"
import healthRouter from "./routes/health.routes"
import { Middleware_404 } from './middleware/404HandlingMiddleware';
import { errorMiddleware } from './middleware/errorHandlingMiddleware';
// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));


app.use(healthRouter)
app.use(statsRouter)
app.use(contributorsRouter)
app.use(projectRouter)



// Error handling middleware
app.use(errorMiddleware);

// 404 handler
app.use(Middleware_404);

app.listen(PORT, () => {
  console.log(`🎃 Hacktoberfest 2025 API running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🚀 Health check: http://localhost:${PORT}/health`);
});