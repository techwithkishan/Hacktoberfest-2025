"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStats = void 0;
const getStats = (req, res) => {
    // Mock data for demonstration
    const stats = {
        totalPRs: Math.floor(Math.random() * 100) + 50,
        contributors: Math.floor(Math.random() * 50) + 20,
        repositories: 3,
        badges: Math.floor(Math.random() * 30) + 25
    };
    res.json(stats);
};
exports.getStats = getStats;
//# sourceMappingURL=stats.controller.js.map