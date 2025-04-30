import React from 'react';
import { Link } from 'react-router-dom';
import coins from '../assets/coins.jpg'; 
const LandingPage = () => {
    return (
        <div className="relative min-h-screen">
            {/* Background Image */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `url(${coins})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    zIndex: -1,
                }}
            ></div>

            {/* Overlay */}
            <div 
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(to bottom, rgba(0, 150, 136, 0.6), rgba(0, 123, 255, 0.6))', 
                    zIndex: 0,
                }}
            ></div>

            {/* Content - Positioned at top-left with readable colors */}
            <div className="absolute top-0 left-0 p-6 text-left z-10">
                <h1 className="text-4xl font-bold text-gray-800 mb-4 drop-shadow-lg">
                    Welcome to WealthMaker
                </h1>
                <p className="text-lg text-black-700 mb-8 drop-shadow-lg">
                    Empowering you with smart tools to manage, grow, and track your wealth effortlessly.
                </p>
                <div className="flex flex-col items-start space-y-4">
                    <Link
                        to="/login"
                        className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Login
                    </Link>
                    <Link
                        to="/info"
                        className="inline-block bg-teal-500 text-red px-8 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        View our Investment information resources
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;