"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const client_1 = require("react-dom/client");
const App_tsx_1 = __importDefault(require("./App.tsx"));
const react_hot_toast_1 = require("react-hot-toast");
const react_router_dom_1 = require("react-router-dom");
require("./index.css");
const AuthContext_tsx_1 = require("./context/AuthContext.tsx");
const SocketContext_tsx_1 = require("./context/SocketContext.tsx");
(0, client_1.createRoot)(document.getElementById('root')).render(<react_1.StrictMode>
    <react_router_dom_1.BrowserRouter>
      <AuthContext_tsx_1.AuthContextProvider>
        <SocketContext_tsx_1.SocketContextProvider>
          <App_tsx_1.default />
        </SocketContext_tsx_1.SocketContextProvider>
      </AuthContext_tsx_1.AuthContextProvider>
    </react_router_dom_1.BrowserRouter>
    <react_hot_toast_1.Toaster />
  </react_1.StrictMode>);
