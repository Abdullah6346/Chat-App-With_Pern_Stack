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
const lucide_react_1 = require("lucide-react");
const useSendMessage_1 = __importDefault(require("../../hooks/useSendMessage"));
const react_1 = require("react");
const MessageInput = () => {
    const [message, setmessage] = (0, react_1.useState)('');
    const { sendMessage, loading } = (0, useSendMessage_1.default)();
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (!message.trim())
            return;
        yield sendMessage(message);
        setmessage('');
    });
    return (<form className="px-4 mb-3 " onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input type="text" className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white" placeholder="Send a message" value={message} onChange={(e) => setmessage(e.target.value)}/>
        <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
          {loading ? (<span className="loading loading-spinner"/>) : (<lucide_react_1.Send className="w-6 h-6 text-white"/>)}
        </button>
      </div>
    </form>);
};
exports.default = MessageInput;
