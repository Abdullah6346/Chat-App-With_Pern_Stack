"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const SocketContext_1 = require("../context/SocketContext");
const useConversation_1 = __importDefault(require("../zustand/useConversation"));
const notification_mp3_1 = __importDefault(require("../assets/sounds/notification.mp3"));
const useListenMessages = () => {
    const { socket } = (0, SocketContext_1.useSocketContext)();
    const { messages, setMessages } = (0, useConversation_1.default)();
    (0, react_1.useEffect)(() => {
        socket === null || socket === void 0 ? void 0 : socket.on('newMessage', (newMessage) => {
            newMessage.shouldShake = true;
            const sound = new Audio(notification_mp3_1.default);
            sound.play();
            setMessages([...messages, newMessage]);
        });
        return () => {
            socket === null || socket === void 0 ? void 0 : socket.off('newMessage');
        };
    }, [socket, messages, setMessages]);
};
exports.default = useListenMessages;
