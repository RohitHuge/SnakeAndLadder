import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import LandingPage from './Pages/LandingPage'
import Login from './Pages/LogIn'
import Registration from './Pages/Registration'
import ForgotPassword from './Pages/ForgotPassword'
import Home from './Pages/Home'
import Game from './Pages/Game'
import GameBoard from './Pages/GameBoard'
import GameLobby from './Pages/GameLobby'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/home" element={<Home />} />
          <Route path="/game" element={<Game />} />
          {/* <Route path="/game-board" element={<GameBoard />} />
          <Route path="/game-lobby" element={<GameLobby />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
