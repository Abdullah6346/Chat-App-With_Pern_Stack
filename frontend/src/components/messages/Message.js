"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthContext_1 = require("../../context/AuthContext");
const extractTime_1 = require("../../utils/extractTime");
const useConversation_1 = __importDefault(require("../../zustand/useConversation"));
const Message = ({ message }) => {
    const { authUser } = (0, AuthContext_1.useAuthContext)();
    const { selectedConversation } = (0, useConversation_1.default)();
    const fromMe = (message === null || message === void 0 ? void 0 : message.senderId) === (authUser === null || authUser === void 0 ? void 0 : authUser.id);
    const chatClass = fromMe ? 'chat-end' : 'chat-start';
    const img = fromMe ? authUser === null || authUser === void 0 ? void 0 : authUser.profilePic : selectedConversation === null || selectedConversation === void 0 ? void 0 : selectedConversation.profilePic;
    const shakeClass = message.shouldShake ? 'shake' : '';
    const bubbleBg = fromMe ? 'bg-blue-500' : '';
    return (<div className={`chat ${chatClass}`}>
      <div className="hidden md:block chat-image avatar">
        <div className="w-6 md:w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={img}/>
        </div>
      </div>
      <p className={`chat-bubble text-white ${bubbleBg}  ${shakeClass}  text-sm md:text-md`}>
        {message.body}
      </p>
      <span className="chat-footer opacity-50 text-xs flex gap-1 items-center text-white">
        {(0, extractTime_1.extractTime)(message.createdAt)}
      </span>
    </div>);
};
exports.default = Message;
