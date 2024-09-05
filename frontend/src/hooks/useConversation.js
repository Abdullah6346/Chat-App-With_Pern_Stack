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
const react_1 = require("react");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const useGetConversations = () => {
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [conversations, setConversations] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const getConversations = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                setLoading(true);
                const res = yield fetch('/api/messages/conversations');
                const data = yield res.json();
                if (!res.ok) {
                    throw new Error(data.error);
                }
                setConversations(data);
            }
            catch (error) {
                react_hot_toast_1.default.error(error.message);
            }
            finally {
                setLoading(false);
            }
        });
        getConversations();
    }, []);
    return { loading, conversations };
};
exports.default = useGetConversations;
