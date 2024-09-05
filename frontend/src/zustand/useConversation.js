"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zustand_1 = require("zustand");
const useConversation = (0, zustand_1.create)((set) => ({
    selectedConversation: null,
    setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),
    messages: [],
    setMessages: (messages) => set({ messages: messages }),
}));
exports.default = useConversation;
