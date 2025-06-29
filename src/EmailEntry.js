// File: EmailEntry.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, sendSignInLinkToEmail } from './firebase';

const EmailEntry = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    if (!email) {
      setMessage('Please enter an email address');
      return;
    }

    setIsLoading(true);
    const actionCodeSettings = {
      url: `${window.location.origin}/dashboard`,
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      setMessage('Check your email for the login link.');
      // Use react-router navigation instead of window.location.href if possible
      // For now, fallback to window.location.href
      window.location.href = '/dashboard';
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
          <h2 className="text-2xl font-semibold mb-2">Sign up or Login</h2>
          <p className="mb-4 text-gray-600">Welcome, Please enter your email</p>
          <input
            className="border w-full px-4 py-2 mb-4 rounded"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleSendOTP}
            className="w-full border px-4 py-2 bg-blue-400 rounded"
          >
            Continue
          </button>
          {message && <p className="mt-4 text-sm text-gray-600 text-red-600">{message}</p>}
        </div>
    </div>
    
  );
};

export default EmailEntry;
