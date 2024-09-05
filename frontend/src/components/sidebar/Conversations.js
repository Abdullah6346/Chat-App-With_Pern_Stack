"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Conversation_1 = __importDefault(require("./Conversation"));
const useConversation_1 = __importDefault(require("../../hooks/useConversation"));
const emojis_1 = require("../../utils/emojis");
const Conversations = () => {
    const { loading, conversations } = (0, useConversation_1.default)();
    return (<div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation) => (<Conversation_1.default key={conversation.id} conversation={conversation} emoji={(0, emojis_1.getRandomEmoji)()}/>))}
      {loading ? <span className="loading loading-spinner mx-auto"/> : null}
    </div>);
};
exports.default = Conversations;
