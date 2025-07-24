// File: Dashboard.js
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar.js';
import DashboardHeader from './DashboardHeader';
import StatsCards from './StatsCards.js';
// import DashboardStatsCards from './DashboardStatusCards.js';
import ChartsSection from './ChartsSection';
import RecentActivity from './RecentActivity';
import RecentCoursesCard from './RecentCoursesCard';
// import GradeDistributionChart from './GradeDistributionChart';
// import ActivityCard from './ActivityCard';
import StudentsTable from './StudentsTable';


const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      if (!currentUser) {
        // Check if user has JWT token in localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login'); // Redirect to login if no user and no token
        }
      } else if (currentUser.emailVerified === false) {
        navigate('/login'); // Redirect to login if email is not verified
      } else {
        setUser(currentUser); // Update user state on profile/email change
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      // ✅ Clear localStorage (important)
      localStorage.removeItem('token');
      localStorage.removeItem('loggedInUser');

      // ✅ Firebase Sign-out
      await auth.signOut();

      // ✅ Redirect to login
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };


  return (
    <div style={{ display: 'flex' }} className="flex min-h-screen bg-gray-50">
      <Sidebar user={user} onLogout={handleLogout} />
      <div className="flex-1 flex flex-col ml-64"> {/* or ml-16 if collapsed */}
        <DashboardHeader user={user} />
        <main className="flex-1 p-6 space-y-6">
          <StatsCards />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <RecentCoursesCard />
             <ChartsSection />
                </div>

         
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  
              <StudentsTable />
               <RecentActivity /> 
          </div>
        
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
