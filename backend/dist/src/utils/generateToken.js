"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (userId, res) => {
    const token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d',
    });
    res.cookie('jwt', token, {
        maxAge: 60 * 60 * 24 * 15 * 1000, //in ms
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development', //https
    });
};
exports.default = generateToken;
