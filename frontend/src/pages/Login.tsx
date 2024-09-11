import { Link } from 'react-router-dom'
import { useState } from 'react'
import React from "react";

import useLogin from '../hooks/useLogin'

const Login = () => {
  const [inputs, setinputs] = useState({
    userName: '',
    password: '',
  })
  const { loading, login } = useLogin()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login(inputs.userName, inputs.password)
  }
  return (
    <div className="flex flex-col items-center justify-center max-md:min-w-[28rem] max-sm:min-w-40 min-w-96 mx-auto">
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
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full input input-bordered h-10"
              value={inputs.userName}
              onChange={(e) =>
                setinputs({ ...inputs, userName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base text-white label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              value={inputs.password}
              onChange={(e) =>
                setinputs({ ...inputs, password: e.target.value })
              }
              className="w-full input input-bordered h-10"
            />
          </div>
          <Link
            to="/signup"
            className="text-sm  text-white hover:text-blue-600 mt-2 inline-block"
          >
            {"Don't"} have an account?
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-2" disabled={loading}>
              {loading ? 'Loading...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Login
