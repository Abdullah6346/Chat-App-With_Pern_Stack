"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const GenderCheckbox_1 = __importDefault(require("../components/GenderCheckbox"));
const react_1 = require("react");
const useSignup_1 = __importDefault(require("../hooks/useSignup"));
const SignUp = () => {
    const [input, setInput] = (0, react_1.useState)({
        fullName: '',
        userName: '',
        password: '',
        confirmPassword: '',
        gender: '',
    });
    const { signup, loading } = (0, useSignup_1.default)();
    const handleGenderChangeBox = (gender) => {
        setInput(Object.assign(Object.assign({}, input), { gender }));
    };
    const handleSubmitForm = (e) => {
        e.preventDefault();
        signup(input);
    };
    return (<div className="flex flex-col items-center justify-center  max-sm:min-w-40 min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center  text-gray-300">
          Sign Up <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmitForm}>
          <div>
            <label className="label p-2">
              <span className="text-base text-white label-text">Full Name</span>
            </label>
            <input type="text" placeholder="Abdullah" className="w-full input input-bordered  h-10" value={input.fullName} onChange={(e) => setInput(Object.assign(Object.assign({}, input), { fullName: e.target.value }))}/>
          </div>

          <div>
            <label className="label p-2 ">
              <span className="text-base text-white label-text">Username</span>
            </label>
            <input type="text" placeholder="abdullah" value={input.userName} onChange={(e) => setInput(Object.assign(Object.assign({}, input), { userName: e.target.value }))} className="w-full input input-bordered h-10"/>
          </div>

          <div>
            <label className="label">
              <span className="text-base text-white label-text">Password</span>
            </label>
            <input type="password" placeholder="Enter Password" className="w-full input input-bordered h-10" value={input.password} onChange={(e) => setInput(Object.assign(Object.assign({}, input), { password: e.target.value }))}/>
          </div>

          <div>
            <label className="label">
              <span className="text-base text-white label-text">
                Confirm Password
              </span>
            </label>
            <input type="password" placeholder="Confirm Password" className="w-full input input-bordered h-10" value={input.confirmPassword} onChange={(e) => setInput(Object.assign(Object.assign({}, input), { confirmPassword: e.target.value }))}/>
          </div>

          <GenderCheckbox_1.default selectedGender={input.gender} onchangeGender={handleGenderChangeBox}/>

          <react_router_dom_1.Link to={'/login'} className="text-sm  hover:text-blue-600 mt-2 inline-block text-white">
            Already have an account?
          </react_router_dom_1.Link>

          <div>
            <button disabled={loading} className="btn btn-block btn-sm  mt-2 border border-slate-700">
              {loading ? 'Loading...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>);
};
exports.default = SignUp;
