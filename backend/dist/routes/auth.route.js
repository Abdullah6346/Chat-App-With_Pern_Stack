"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const protect_Route_1 = __importDefault(require("../middlewares/protect.Route"));
const router = (0, express_1.Router)();
// api/auth/login
router.get('/me', protect_Route_1.default, auth_controller_1.getMe);
router.post('/signup', auth_controller_1.signup);
router.post('/login', auth_controller_1.login);
router.post('/logout', auth_controller_1.logout);
exports.default = router;
