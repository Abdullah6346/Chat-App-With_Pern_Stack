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
const react_1 = require("react");
const useConversation_1 = __importDefault(require("../../zustand/useConversation"));
const useConversation_2 = __importDefault(require("../../hooks/useConversation"));
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const SearchInput = () => {
    const [search, setSearch] = (0, react_1.useState)('');
    const { setSelectedConversation } = (0, useConversation_1.default)();
    const { conversations } = (0, useConversation_2.default)();
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (!search.trim())
            return;
        if (search.length < 3) {
            return react_hot_toast_1.default.error('Search Term Should be at least 3 characters long');
        }
        const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));
        if (conversation) {
            setSelectedConversation(conversation);
            setSearch('');
        }
        else {
            react_hot_toast_1.default.error('User not found');
        }
    });
    return (<form className="flex items-center gap-2 " onSubmit={handleSubmit}>
      <input type="text" placeholder="Search…" className="input-sm md:input input-bordered rounded-full sm:rounded-full w-full" value={search} onChange={(e) => setSearch(e.target.value)}/>
      <button type="submit" className="btn md:btn-md btn-sm btn-circle bg-sky-500 text-white  ">
        <lucide_react_1.Search className="w-4 h-4 md:w-6 md:h-6 outline-none"/>
      </button>
    </form>);
};
exports.default = SearchInput;
