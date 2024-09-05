"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const message_route_1 = __importDefault(require("./routes/message.route"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const socket_1 = require("./socket/socket");
dotenv_1.default.config();
const port = process.env.PORT || 3000;
socket_1.app.use(express_1.default.json());
socket_1.app.use((0, cookie_parser_1.default)());
socket_1.app.use('/api/auth', auth_route_1.default);
socket_1.app.use('/api/messages', message_route_1.default);
socket_1.app.get('/', (req, res) => {
    res.send('Hello World!');
});
socket_1.server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
