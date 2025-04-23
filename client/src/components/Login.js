import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then((res) => {
            if(res.ok) {
                res.json()
                navigate('/investments')
            }
            if(res.status === 401){
                alert("Incorrect Email or Password")
            } 
        })
        .catch((error) => console.error("Error Data: ", +error))
    };

    return (
        <div className="bg-gradient-to-r from-teal-100 to-blue-100 min-h-screen flex justify-center items-center p-8">
            <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-lg">
                {/* Login Form Header */}
                <h2 className="text-2xl font-bold text-teal-800 text-center mb-6">
                    Log in to your account
                </h2>

                {/* Login Form */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-2 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="mt-2 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition duration-300"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                {/* Forgot Password Link */}
                <div className="text-center text-sm mt-4">
                    <Link to="/forgot-password" className="text-teal-600 hover:text-teal-500">
                        Forgot password?
                    </Link>
                </div>

                {/* Sign Up Link */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Not a member?{' '}
                    <Link to="/signup" className="text-teal-600 hover:text-teal-500">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;