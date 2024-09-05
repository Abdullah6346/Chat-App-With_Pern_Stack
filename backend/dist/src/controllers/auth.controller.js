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
exports.getMe = exports.logout = exports.login = exports.signup = void 0;
const prisma_1 = __importDefault(require("../../db/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, fullName, password, confirmPassword, gender } = req.body;
        if (!userName || !fullName || !password || !confirmPassword || !gender) {
            return res.status(400).json({ error: 'Please Fill All the Fields ' });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords Do Not Match' });
        }
        const user = yield prisma_1.default.user.findUnique({
            where: {
                userName,
            },
        });
        if (user) {
            return res.status(400).json({ error: 'User Already Exists' });
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        // Api i used https://avatar.iran.liara.run/public/boy?username
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;
        const newUser = yield prisma_1.default.user.create({
            data: {
                fullName,
                userName,
                gender,
                password: hashedPassword,
                profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
            },
        });
        if (newUser) {
            (0, generateToken_1.default)(newUser.id, res);
            return res.status(200).json({
                id: newUser.id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                gender: newUser.gender,
                profilePic: newUser.profilePic,
            });
        }
    }
    catch (error) {
        console.log('Error in signup Controller', error.message);
        return res.status(500).json({ error: 'Error in Creating User' });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password } = req.body;
        const user = yield prisma_1.default.user.findUnique({
            where: {
                userName,
            },
        });
        if (!user) {
            res.status(400).json({ error: 'Invalid Username' });
        }
        const isPasswordCorrect = user && (yield bcryptjs_1.default.compare(password, user.password));
        if (!isPasswordCorrect) {
            res.status(400).json({ error: 'Invalid Password' });
        }
        if (user && isPasswordCorrect) {
            (0, generateToken_1.default)(user.id, res);
            return res.status(200).json({
                id: user.id,
                fullName: user.fullName,
                userName: user.userName,
                gender: user.gender,
                profilePic: user.profilePic,
            });
        }
        else {
            res.status(400).json({ error: 'Invalid Username or Password' });
        }
    }
    catch (error) {
        console.log('Error in Login Controller', error.message);
        return res.status(500).json({ error: 'Error in Loging User' });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie('jwt');
        return res.status(200).json({ message: 'Logged Out Successfully' });
    }
    catch (error) {
        console.log('Error in Logout Controller', error.message);
        return res.status(500).json({ error: 'Error in Logging Out' });
    }
});
exports.logout = logout;
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_1.default.user.findUnique({
            where: {
                id: req.user.id,
            },
        });
        if (!user) {
            return res.status(404).json({ error: 'User Not Found' });
        }
        res.status(200).json({
            id: user.id,
            fullName: user.fullName,
            userName: user.userName,
            gender: user.gender,
            profilePic: user.profilePic,
        });
    }
    catch (error) {
        console.log('Error in getMe Controller', error.message);
        res.status(200).json({ error: 'Error in getting user' });
    }
});
exports.getMe = getMe;
