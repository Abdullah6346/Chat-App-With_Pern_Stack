import { Link } from 'react-router-dom'
import GenderCheckbox from '../components/GenderCheckbox'
import { useState } from 'react'
import useSignup from '../hooks/useSignup'
import React from "react";


const SignUp = () => {
  const [input, setInput] = useState({
    fullName: '',
    userName: '',
    password: '',
    confirmPassword: '',
    gender: '',
  })

  const { signup, loading } = useSignup()
  const handleGenderChangeBox = (gender: 'male' | 'female') => {
    setInput({ ...input, gender })
  }

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()

    signup(input)
  }

  return (
    <div className="flex flex-col items-center justify-center  max-sm:min-w-40 min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center  text-gray-300">
          Sign Up <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmitForm}>
          <div>
            <label className="label p-2">
              <span className="text-base text-white label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Abdullah"
              className="w-full input input-bordered  h-10"
              value={input.fullName}
              onChange={(e) => setInput({ ...input, fullName: e.target.value })}
            />
          </div>

          <div>
            <label className="label p-2 ">
              <span className="text-base text-white label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="abdullah"
              value={input.userName}
              onChange={(e) => setInput({ ...input, userName: e.target.value })}
              className="w-full input input-bordered h-10"
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base text-white label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base text-white label-text">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
              value={input.confirmPassword}
              onChange={(e) =>
                setInput({ ...input, confirmPassword: e.target.value })
              }
            />
          </div>

          <GenderCheckbox
            selectedGender={input.gender}
            onchangeGender={handleGenderChangeBox}
          />

          <Link
            to={'/login'}
            className="text-sm  hover:text-blue-600 mt-2 inline-block text-white"
          >
            Already have an account?
          </Link>

          <div>
            <button
              disabled={loading}
              className="btn btn-block btn-sm  mt-2 border border-slate-700"
            >
              {loading ? 'Loading...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default SignUp
