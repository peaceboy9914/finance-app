import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Income from './pages/Dashboard/Income'
import Expense from './pages/Dashboard/Expense'
import Home from './pages/Dashboard/Home'
import UserProvider from './context/userContext'

const App = () => {
  return (
    <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignUp />} />
             <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
          </Routes>
        </Router>
    </UserProvider>
  )
}

export default App

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? (
    <Navigate to="/dashboard"/>
  ) : (
    <Navigate to="/login"/>
  )
}