"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware_404 = void 0;
const Middleware_404 = (req, res, next) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.originalUrl} not found`
    });
    next();
};
exports.Middleware_404 = Middleware_404;
//# sourceMappingURL=404HandlingMiddleware.js.map