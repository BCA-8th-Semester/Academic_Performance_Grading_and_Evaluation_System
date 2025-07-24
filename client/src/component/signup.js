import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo({ ...signupInfo, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError('Name, email, and password are required');
    }

    try {
      const url = `http://localhost:5000/academic/signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      });
      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/login'); // Fixed: navigate to '/login' instead of '/LoginForm '
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 px-4">
      <div className="text-center mb-6">
        <h1 className="text-5xl font-bold text-black-500">GradePro</h1>
      </div>

      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-md">

        <form onSubmit={handleSignup}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-600">Create Account</h2>
          <p className="mb-6 text-gray-500">Please fill out the form to sign up.</p>

          <div className="mb-4 text-left">
            <label htmlFor='name' className="block text-gray-700 mb-1">Name</label>
            <input
              type='text'
              name='name'
              value={signupInfo.name}
              onChange={handleChange}
              placeholder='Enter your name'
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              autoFocus
            />
          </div>

          <div className="mb-4 text-left">
            <label htmlFor='email' className="block text-gray-700 mb-1">Email</label>
            <input
              type='email'
              name='email'
              value={signupInfo.email}
              onChange={handleChange}
              placeholder='Enter your email'
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-6 text-left">
            <label htmlFor='password' className="block text-gray-700 mb-1">Password</label>
            <input
              type='password'
              name='password'
              value={signupInfo.password}
              onChange={handleChange}
              placeholder='Enter your password'
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type='submit'
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>

          <p className="mt-4 text-sm text-gray-600 text-center">
            Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
          </p>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Signup;
