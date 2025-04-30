import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // import auth context

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // use auth context

  const handleLogout = () => {
    fetch("/logout", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.ok) {
          logout(); // clear context user
          alert("Logout Successful!");
          navigate("/");
        }
      })
      .catch(err => console.error("Error Data:", err));
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
          to="/info" 
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

        {user ? (
            <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-full shadow-sm border border-teal-200">
                <span className="text-teal-800 font-semibold">
                Welcome {user.full_name || user.email}
                </span>
                <button 
                className="bg-teal-300 text-white text-sm px-3 py-1 rounded-md hover:bg-teal-700 transition duration-300"
                onClick={handleLogout}
                >
                Log Out
                </button>
            </div>
            ) : (
            <Link
                to="/login"
                className="bg-teal-300 text-white text-sm px-3 py-1 rounded-md hover:bg-teal-700 transition duration-300"
            >
                Log In
            </Link>
            )}
      </div>
    </div>
  );
};

export default Navbar;