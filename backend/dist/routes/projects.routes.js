"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projects_controller_1 = require("../controllers/projects.controller");
const router = express_1.default.Router();
router.get("/api/projects", projects_controller_1.getProjects);
exports.default = router;
//# sourceMappingURL=projects.routes.js.map