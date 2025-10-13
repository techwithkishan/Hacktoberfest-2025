"use strict";

// Core and 3rd-party dependencies
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const dotenv = require("dotenv");

// Routes
const statsRoutes = require("./routes/stats.routes");
const contributorsRoutes = require("./routes/contributors.routes");
const projectsRoutes = require("./routes/projects.routes");
const healthRoutes = require("./routes/health.routes");
const authRoutes = require("./routes/authRoutes");

// Middleware
const { Middleware_404 } = require("./middleware/404HandlingMiddleware");
const { errorMiddleware } = require("./middleware/errorHandlingMiddleware");
const { limiter } = require("./middleware/rateLimiterMiddleware");

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Global Middleware
app.use(helmet());                              // Security headers
app.use(cors());                                // Cross-Origin Resource Sharing
app.use(compression());                         // Gzip compression
app.use(morgan("combined"));                    // Request logging
app.use(express.json({ limit: "10mb" }));       // Parse JSON payloads
app.use(express.urlencoded({ extended: true }));// Parse URL-encoded data

// Rate Limiting
app.use(limiter);

// Application Routes
app.use("/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/contributors", contributorsRoutes);
app.use("/api/projects", projectsRoutes);

// Error Handling
app.use(errorMiddleware);

// 404 Handler (keep at the end)
app.use(Middleware_404);

// Start the server
app.listen(PORT, () => {
  console.log(`🎃 Hacktoberfest 2025 API running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🚀 Health check: http://localhost:${PORT}/health`);
  console.log(`🔐 Auth routes: http://localhost:${PORT}/api/auth`);
});
