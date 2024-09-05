"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthContext_1 = require("../../context/AuthContext");
const useConversation_1 = __importDefault(require("../../zustand/useConversation"));
const MessageInput_1 = __importDefault(require("./MessageInput"));
const Messages_1 = __importDefault(require("./Messages"));
const lucide_react_1 = require("lucide-react");
const MessageContainer = () => {
    const { selectedConversation } = (0, useConversation_1.default)();
    return (<div className="w-full flex flex-col">
      {!selectedConversation ? (<NoChatSelected />) : (<>
          {/* Header */}
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To:</span>{' '}
            <span className="text-gray-900 font-bold">
              {selectedConversation === null || selectedConversation === void 0 ? void 0 : selectedConversation.fullName}
            </span>
          </div>

          <Messages_1.default />
          <MessageInput_1.default />
        </>)}
    </div>);
};
exports.default = MessageContainer;
const NoChatSelected = () => {
    const { authUser } = (0, AuthContext_1.useAuthContext)();
    return (<div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser === null || authUser === void 0 ? void 0 : authUser.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <lucide_react_1.MessageCircle className="text-3xl md:text-6xl text-center"/>
      </div>
    </div>);
};
