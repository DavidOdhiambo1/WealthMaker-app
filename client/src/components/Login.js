import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import the AuthContext

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login from context

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

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
      if (res.ok) {
        return res.json(); // return user info
      } else if (res.status === 401) {
        alert("Incorrect Email or Password");
        throw new Error("Unauthorized");
      } else {
        throw new Error("Login failed");
      }
    })
    .then((data) => {
      login(data); // ✅ set user in context
      navigate('/investments'); // ✅ redirect
    })
    .catch((error) => {
      console.error("Login Error:", error);
    });
  };

  return (
    <div className="bg-gradient-to-r from-teal-100 to-blue-100 min-h-screen flex justify-center items-center p-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-teal-800 text-center mb-6">
          Log in to your account
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email address
            </label>
            <input
              id="email"
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

        <div className="text-center text-sm mt-4">
          <Link to="/forgot-password" className="text-teal-600 hover:text-teal-500">
            Forgot password?
          </Link>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Not a member?{" "}
          <Link to="/signup" className="text-teal-600 hover:text-teal-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;