import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Login from './components/auth/login'
import Register from './components/auth/register'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />}>
        </Route>
        <Route path="/register" element={<Register />}>
        </Route>
        <Route path="/Home" element={<Home />}>
        </Route>
      </Routes>
    </div>
  )
}

export default App
