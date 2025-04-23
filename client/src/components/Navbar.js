import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        fetch("/logout", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if(res.ok) {
                alert("Logout Successful!")
                navigate("/")
            }
        })
        .catch(err => console.error("Error Data: ", + err))
    };
     
    
    return (
        <div className="bg-gradient-to-r from-teal-100 to-blue-100 shadow-md max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
            
            {/* Logo Section */}
            <div>
                <h1 className="text-2xl font-semibold text-teal-800">WealthMaker</h1>
            </div>

            {/* Navigation Links and Log Out */}
            <div className="flex items-center space-x-6">
                <Link 
                    to="/investments" 
                    className="text-teal-700 hover:text-teal-900 transition duration-300"
                >
                    Investments
                </Link>
                <Link 
                    to="/goals" 
                    className="text-teal-700 hover:text-teal-900 transition duration-300"
                >
                    Goals
                </Link>
                <Link 
                    to="/resources" 
                    className="text-teal-700 hover:text-teal-900 transition duration-300"
                >
                    Resources
                </Link>
                <Link 
                    to="/investment-form" 
                    className="text-teal-700 hover:text-teal-900 transition duration-300"
                >
                    Add Investment
                </Link>
                <button 
                    className="bg-teal-600 text-white text-sm px-3 py-1 rounded-md hover:bg-teal-700 transition duration-300"
                    onClick={handleLogout}
                >
                    Log Out
                </button>
            </div>

        </div>
    );
};

export default Navbar;
