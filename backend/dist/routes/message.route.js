"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const protect_Route_1 = __importDefault(require("../middlewares/protect.Route"));
const message_controller_1 = require("../controllers/message.controller");
const router = (0, express_1.Router)();
router.get('/conversations', protect_Route_1.default, message_controller_1.getUsersForSidebar);
router.get('/:id', protect_Route_1.default, message_controller_1.getMessages);
router.post('/send/:id', protect_Route_1.default, message_controller_1.sendMessage);
exports.default = router;
