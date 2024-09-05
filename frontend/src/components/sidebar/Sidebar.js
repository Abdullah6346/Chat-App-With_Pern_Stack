"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Conversations_1 = __importDefault(require("./Conversations"));
const LogoutButton_1 = __importDefault(require("./LogoutButton"));
const SearchInput_1 = __importDefault(require("./SearchInput"));
const Sidebar = () => {
    return (<div className='border-r border-slate-500 p-1 md:p-4 flex flex-col w-44 md:w-1/2'>
			<SearchInput_1.default />
			<div className='divider px-3'/>
			<Conversations_1.default />
			<LogoutButton_1.default />
		</div>);
};
exports.default = Sidebar;
