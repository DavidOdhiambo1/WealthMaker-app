import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import HomePage from './components/HomePage';
import InvestmentForm from './components/InvestmentForm';
import GoalsTable from './components/GoalsTable';
import InvestmentInformation from './components/InvestmentInfomation';
import { AuthProvider } from './components/AuthContext';


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/investments" element={<HomePage />} />
        <Route path="/investment-form" element={<InvestmentForm />} />
        <Route path="/goals" element={<GoalsTable />} />
        <Route path="/info" element={<InvestmentInformation  />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
