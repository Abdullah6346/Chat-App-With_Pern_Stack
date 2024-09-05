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
const AuthContext_1 = require("../context/AuthContext");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const useSignup = () => {
    const [loading, setLoading] = (0, react_1.useState)(false);
    const { setAuthUser } = (0, AuthContext_1.useAuthContext)();
    const signup = (inputs) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            setLoading(true);
            const res = yield fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputs),
            });
            const data = yield res.json();
            if (!res.ok)
                throw new Error(data.error);
            setAuthUser(data);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (error) {
            console.error(error.message);
            react_hot_toast_1.default.error(error.message);
        }
        finally {
            setLoading(false);
        }
    });
    return { loading, signup };
};
exports.default = useSignup;
