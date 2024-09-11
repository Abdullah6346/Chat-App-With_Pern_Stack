import { Navigate, Route, Routes } from 'react-router-dom'
import React from 'react'


import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import { useAuthContext } from './context/AuthContext'
function App() {
  const { authUser, isLoading } = useAuthContext()
  if (isLoading) return null
  return (
    <main className="container-main p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={'/login'} />}
        ></Route>
        <Route
          path="/signup"
          element={!authUser ? <SignUp /> : <Navigate to={'/'} />}
        ></Route>
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to={'/'} />}
        ></Route>
      </Routes>
    </main>
  )
}

export default App
