import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import Login from './Pages/LogIn'
import Registration from './Pages/Registration'
import ForgotPassword from './Pages/ForgotPassword'
import Home from './Pages/Home'
import GameBoard from './Pages/GameBoard'
import GameLobby from './Pages/GameLobby'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/game-board" element={<GameBoard />} />
        <Route path="/game-lobby" element={<GameLobby />} />
      </Routes>
    </Router>
  )
}

export default App
