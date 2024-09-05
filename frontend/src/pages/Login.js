"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("react");
const useLogin_1 = __importDefault(require("../hooks/useLogin"));
const Login = () => {
    const [inputs, setinputs] = (0, react_1.useState)({
        userName: '',
        password: '',
    });
    const { loading, login } = (0, useLogin_1.default)();
    const handleSubmit = (e) => {
        e.preventDefault();
        login(inputs.userName, inputs.password);
    };
    return (<div className="flex flex-col items-center justify-center max-md:min-w-[28rem] max-sm:min-w-40 min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-white">
          Login
          <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2 ">
              <span className="text-base text-white label-text">Username</span>
            </label>
            <input type="text" placeholder="Enter Username" className="w-full input input-bordered h-10" value={inputs.userName} onChange={(e) => setinputs(Object.assign(Object.assign({}, inputs), { userName: e.target.value }))}/>
          </div>

          <div>
            <label className="label">
              <span className="text-base text-white label-text">Password</span>
            </label>
            <input type="password" placeholder="Enter Password" value={inputs.password} onChange={(e) => setinputs(Object.assign(Object.assign({}, inputs), { password: e.target.value }))} className="w-full input input-bordered h-10"/>
          </div>
          <react_router_dom_1.Link to="/signup" className="text-sm  text-white hover:text-blue-600 mt-2 inline-block">
            {"Don't"} have an account?
          </react_router_dom_1.Link>

          <div>
            <button className="btn btn-block btn-sm mt-2" disabled={loading}>
              {loading ? 'Loading...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>);
};
exports.default = Login;
