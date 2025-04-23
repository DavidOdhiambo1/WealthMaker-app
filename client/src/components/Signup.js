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

    const handlChange = (e) => {
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
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign up for an account    
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="full_name" className="block text-sm font-medium leading-6 text-gray-900">Full name</label>
                        <div className="mt-2">
                            <input 
                            id="full_name" 
                            name="full_name" 
                            type="text" 
                            required 
                            value={formData.full_name}
                            onChange={handlChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input 
                            id="email" 
                            name="email" 
                            type="email" 
                            value={formData.email}
                            onChange={handlChange}
                            required 
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input 
                            id="password" 
                            name="password" 
                            type="password" 
                            value={formData.password}
                            onChange={handlChange}
                            required 
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    <div>
                        <button type="submit" 
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Sign up
                        </button>
                    </div>
                </form>
                <p className="mt-10 text-center text-sm text-gray-500">
                Already a member?
                <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Log in</Link>
                </p>
            </div>
        </div> 
        )
};

export default Signup;