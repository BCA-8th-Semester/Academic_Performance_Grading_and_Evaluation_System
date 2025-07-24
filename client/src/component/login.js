// File: EmailEntry.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function LoginForm() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError('Email and password are required');
    }

    try {
      const url = `https://academic-performance-grading-and-ev.vercel.app/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });

      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        setTimeout(() => {  
          navigate('/dashboard'); // Fixed: lowercase 'dashboard'
        }, 1000);
      } else if (error) {
        const details = error?.details[0]?.message;
        handleError(details);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center mb-6">
        <h1 className="text-5xl font-bold text-black-600">GradePro</h1>
      </div>

      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-md">
        <form onSubmit={handleLogin}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Login</h2>
          <p className="mb-6 text-gray-500">Welcome back! Please enter your details.</p>

          <div className="mb-4 text-left">
            <label htmlFor='email' className="block text-gray-700 mb-1">Email</label>
            <input
              type='email'
              name='email'
              value={loginInfo.email}
              onChange={handleChange}
              placeholder='Enter your email'
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-6 text-left">
            <label htmlFor='password' className="block text-gray-700 mb-1">Password</label>
            <input
              type='password'
              name='password'
              value={loginInfo.password}
              onChange={handleChange}
              placeholder='Enter your password'
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type='submit'
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>

          <p className="mt-4 text-sm text-gray-600">
            Don't have an account? <Link to="/signup" className="text-indigo-600 hover:underline">Sign up</Link>
          </p>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default LoginForm;
