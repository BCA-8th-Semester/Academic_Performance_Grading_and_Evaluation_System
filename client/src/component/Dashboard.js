// File: Dashboard.js
import React, { useEffect } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar.js';


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
  <div style={{ display: 'flex' }} className="flex min-h-screen bg-gray-50">
    <Sidebar />
    <div style={{ marginLeft: 220, padding: 20, width: '100%' }} className="flex-1 flex flex-col">
      {/* Your dashboard content here */}
      <h1>Welcome to the Dashboard</h1>
      {/* <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 space-y-6">
          <StatsCards />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartsSection />
            <RecentActivity />
          </div>
          <StudentsTable />
        </main>
      </div> */}
    </div>
  </div>
  );
};

export default Dashboard;
