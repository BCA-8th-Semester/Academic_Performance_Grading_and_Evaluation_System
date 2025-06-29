// File: Dashboard.js
import React, { useEffect } from 'react';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome to GradePro Dashboard!</h1>
      <p className="mb-6">You are successfully logged in using passwordless authentication.</p>
      <button
        onClick={handleLogout}
        className="border px-4 py-2 hover:bg-gray-200"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
