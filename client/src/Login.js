// File: EmailEntry.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

const EmailEntry = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    setMessage('');
    if (!email || !password) {
      setMessage('Please enter both email and password');
      return;
    }
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('Sign in successful! Redirecting...');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (error) {
      setMessage(`Sign in error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setMessage('');
    if (!email) {
      setMessage('Please enter your email to reset password');
      return;
    }
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent! Check your inbox.');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="mb-8">
        <h1 className="text-5xl text-center font-inter font-thin">
          GradePro
        </h1>
      </div>
      <div className="p-8 rounded-2xl shadow-xl text-center w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-2">Login</h2>
        <p className="mb-4 text-gray-600">Welcome, Please enter your email and password</p>
        <input
          className="border w-full px-4 py-2 mb-4 rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border w-full px-4 py-2 mb-4 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSignIn}
          className="w-full border px-4 py-2 bg-blue-500 text-white rounded mb-2"
          disabled={isLoading}
        >
          Login
        </button>
        <div className="mt-2">
          <button
            onClick={handleForgotPassword}
            className="text-blue-600 underline"
            disabled={isLoading}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            Forgot Password?
          </button>
        </div>
        {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
      </div>
    </div>
  );
};

export default EmailEntry;
