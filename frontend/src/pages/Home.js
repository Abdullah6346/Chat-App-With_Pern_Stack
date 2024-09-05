"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageContainer_1 = __importDefault(require("../components/messages/MessageContainer"));
const Sidebar_1 = __importDefault(require("../components/sidebar/Sidebar"));
const Home = () => {
    return (<div className='flex h-[80vh] w-full md:max-w-[80%] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<Sidebar_1.default />
			<MessageContainer_1.default />
		</div>);
};
exports.default = Home;
