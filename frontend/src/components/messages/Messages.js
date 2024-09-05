"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const useChatScroll_1 = __importDefault(require("../../hooks/useChatScroll"));
const useGetMessages_1 = __importDefault(require("../../hooks/useGetMessages"));
const useListenMessages_1 = __importDefault(require("../../hooks/useListenMessages"));
const MessageSkeleton_1 = __importDefault(require("../skeletons/MessageSkeleton"));
const Message_1 = __importDefault(require("./Message"));
require("../../index.css");
const Messages = () => {
    const { loading, messages } = (0, useGetMessages_1.default)();
    const ref = (0, useChatScroll_1.default)(messages);
    (0, useListenMessages_1.default)();
    return (<div className="px-4 flex-1 overflow-auto" ref={ref}>
      {loading && [...Array(3)].map((_, i) => <MessageSkeleton_1.default key={i}/>)}
      {!loading &&
            messages.map((message) => (<Message_1.default key={message.id} message={message}/>))}
      {!loading && messages.length === 0 && (<p className="text-center text-white">
          Send message to start conversation
        </p>)}
    </div>);
};
exports.default = Messages;
