import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar.js';
import DashboardHeader from './DashboardHeader';
import RecentCoursesCard from './RecentCoursesCard'; // Import RecentCoursesCard

const Courses = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      if (!currentUser) {
        navigate('/');
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div style={{ display: 'flex' }} className="flex min-h-screen bg-gray-50">
      <Sidebar user={user} />
      <div className="flex-1 flex flex-col ml-64"> {/* Added margin-left here */}
        <DashboardHeader user={user} title="Courses" />
        <main className="flex-1 p-6 space-y-6">
         
          {/* Add RecentCoursesCard here */}
          <RecentCoursesCard />
       
        </main>
      </div>
    </div>
  );
};

export default Courses;