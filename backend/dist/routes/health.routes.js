"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/health", (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Hacktoberfest 2025 API is running! 🎃',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});
exports.default = router;
//# sourceMappingURL=health.routes.js.map