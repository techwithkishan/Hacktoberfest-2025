"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const dotenv_1 = __importDefault(require("dotenv"));
const stats_routes_1 = __importDefault(require("./routes/stats.routes"));
const contributors_routes_1 = __importDefault(require("./routes/contributors.routes"));
const projects_routes_1 = __importDefault(require("./routes/projects.routes"));
const health_routes_1 = __importDefault(require("./routes/health.routes"));
const _404HandlingMiddleware_1 = require("./middleware/404HandlingMiddleware");
const errorHandlingMiddleware_1 = require("./middleware/errorHandlingMiddleware");
const rateLimiterMiddleware_1 = require("./middleware/rateLimiterMiddleware");
// Import auth routes
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, compression_1.default)());
app.use((0, morgan_1.default)('combined'));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
// Apply rate limiting to all routes
app.use(rateLimiterMiddleware_1.limiter);
// Routes
app.use(health_routes_1.default);
app.use('/api/auth', authRoutes_1.default); // Add authentication routes
app.use(stats_routes_1.default);
app.use(contributors_routes_1.default);
app.use(projects_routes_1.default);
// Error handling middleware
app.use(errorHandlingMiddleware_1.errorMiddleware);
// 404 handler
app.use(_404HandlingMiddleware_1.Middleware_404);
app.listen(PORT, () => {
    console.log(`🎃 Hacktoberfest 2025 API running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🚀 Health check: http://localhost:${PORT}/health`);
    console.log(`🔐 Auth routes: http://localhost:${PORT}/api/auth`);
});
//# sourceMappingURL=index.js.map