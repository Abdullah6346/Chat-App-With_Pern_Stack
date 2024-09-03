import { Route, Routes } from 'react-router-dom'
function App() {
  return (
    <main className="container-main p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={<Home />}>
          {' '}
        </Route>
        <Route path="/signup" element={<Signup />}>
          {' '}
        </Route>
        <Route path="/login" element={<Login />}>
          {' '}
        </Route>
      </Routes>
    </main>
  )
}

export default App
