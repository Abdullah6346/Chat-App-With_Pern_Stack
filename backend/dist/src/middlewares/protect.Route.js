"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../../db/prisma"));
const protectRoute = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res
                .status(401)
                .json({ error: 'Unauthorized - Token Not Provided ' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.userId) {
            return res.status(401).json({ error: 'Unauthorized - Invalid Token' });
        }
        const user = yield prisma_1.default.user.findUnique({
            where: {
                id: decoded.userId,
            },
            select: { id: true, fullName: true, profilePic: true, userName: true },
        });
        if (!user) {
            res.status(401).json({ error: 'User Not Found ' });
        }
        user ? (req.user = user) : null;
        next();
    }
    catch (error) {
        console.log('Error in Protected Route', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.default = protectRoute;
