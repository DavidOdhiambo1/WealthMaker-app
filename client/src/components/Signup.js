import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Signup = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        full_name:"",
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
        fetch("/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then((res) => {
            if(res.ok) {
                res.json()
                navigate('/login')
            }
            if(res.status === 409) {
                alert("User already exists!!")
            }
        })
        .catch((error) => console.error("Error Data: " +error))
    };
    return (
        <div className="bg-gradient-to-r from-teal-100 to-blue-100 min-h-screen flex justify-center items-center p-8">
            <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-teal-800 text-center">
                    Sign up for an account
                </h2>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="full_name" className="block text-sm font-medium text-gray-900">
                            Full name
                        </label>
                        <input
                            id="full_name"
                            name="full_name"
                            type="text"
                            value={formData.full_name}
                            onChange={handleChange}
                            required
                            className="mt-2 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

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

                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition duration-300"
                    >
                        Sign up
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500">
                    Already a member?{' '}
                    <Link to="/login" className="text-teal-600 hover:text-teal-500 font-semibold">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;