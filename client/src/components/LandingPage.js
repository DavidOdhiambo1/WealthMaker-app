import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Welcome to WealthMaker</h1>
            <p className="text-lg mb-8">Your one-stop solution for wealth management.</p>
            <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                Login
            </Link>
        </div>
    );
};

export default LandingPage;