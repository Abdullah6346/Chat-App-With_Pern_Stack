"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lucide_react_1 = require("lucide-react");
const useLogout_1 = __importDefault(require("../../hooks/useLogout"));
const LogoutButton = () => {
    const { logout } = (0, useLogout_1.default)();
    return (<div className="mt-auto">
      <lucide_react_1.LogOut className="w-6 h-6 text-white cursor-pointer" onClick={logout}/>
    </div>);
};
exports.default = LogoutButton;
