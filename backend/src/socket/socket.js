"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.io = exports.app = exports.getRecieverSocket = void 0;
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
exports.app = app;
const server = http_1.default.createServer(app);
exports.server = server;
const io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
});
exports.io = io;
const getRecieverSocket = (receiverId) => {
    return userSocketMap[receiverId];
};
exports.getRecieverSocket = getRecieverSocket;
const userSocketMap = {};
io.on('connection', (socket) => {
    console.log('Socket connected: ', socket.id);
    const userId = socket.handshake.query.userId;
    if (userId)
        userSocketMap[userId] = socket.id;
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
    socket.on('disconnect', () => {
        console.log('Socket disconnected: ', socket.id);
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
});
