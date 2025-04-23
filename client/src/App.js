import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import HomePage from './components/HomePage';
import InvestmentForm from './components/InvestmentForm';


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/investments" element={<HomePage />} />
      <Route path="/investment-form" element={<InvestmentForm />} />
    </Routes>
  );
}

export default App;
