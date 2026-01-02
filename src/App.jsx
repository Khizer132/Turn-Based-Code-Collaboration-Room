import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Login from './components/auth/login'
import Signup from './components/auth/signup'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />}>
        </Route>
        <Route path="/signup" element={<Signup />}>
        </Route>
        <Route path="/Home" element={<Home />}>
        </Route>
      </Routes>
    </div>
  )
}

export default App
