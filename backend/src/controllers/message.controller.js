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
exports.getUsersForSidebar = exports.getMessages = exports.sendMessage = void 0;
const prisma_1 = __importDefault(require("../../db/prisma"));
const socket_1 = require("../socket/socket");
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user.id;
        let conversations = yield prisma_1.default.conversation.findFirst({
            where: {
                participantsIds: {
                    hasEvery: [senderId, receiverId],
                },
            },
        });
        if (!conversations) {
            conversations = yield prisma_1.default.conversation.create({
                data: {
                    participantsIds: {
                        set: [senderId, receiverId],
                    },
                },
            });
        }
        const newMessage = yield prisma_1.default.message.create({
            data: {
                senderId,
                body: message,
                conversationId: conversations.id,
            },
        });
        if (newMessage) {
            conversations = yield prisma_1.default.conversation.update({
                where: {
                    id: conversations.id,
                },
                data: {
                    message: {
                        connect: {
                            id: newMessage.id,
                        },
                    },
                },
            });
        }
        // Socket.io
        const receiverSocketId = (0, socket_1.getRecieverSocket)(receiverId);
        if (receiverSocketId) {
            socket_1.io.to(receiverSocketId).emit('newMessage', newMessage);
        }
        if (!newMessage) {
            return res.status(200).json([]);
        }
        res.status(200).json(newMessage);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error in sending message' });
    }
});
exports.sendMessage = sendMessage;
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user.id;
        const conversation = yield prisma_1.default.conversation.findFirst({
            where: {
                participantsIds: {
                    hasEvery: [senderId, userToChatId],
                },
            },
            include: {
                message: {
                    orderBy: {
                        createdAt: 'asc',
                    },
                },
            },
        });
        if (!conversation) {
            return res.status(200).json([]);
        }
        res.status(200).json(conversation.message);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error in getting messages' });
    }
});
exports.getMessages = getMessages;
const getUsersForSidebar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authUserId = req.user.id;
        const users = yield prisma_1.default.user.findMany({
            where: {
                id: {
                    not: authUserId,
                },
            },
            select: {
                id: true,
                fullName: true,
                profilePic: true,
            },
        });
        res.status(200).json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error in getting users' });
    }
});
exports.getUsersForSidebar = getUsersForSidebar;
