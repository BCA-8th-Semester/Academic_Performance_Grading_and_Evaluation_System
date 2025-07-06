// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './component/Dashboard';
import Login from './Login';
import Courses from './component/Courses'; // Import Courses
import AdminTools from './component/Admin_tools'; // Import AdminTools

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Login route */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} /> {/* Add Courses route */}
        <Route path="/admin-tools" element={<AdminTools />} /> {/* Add AdminTools route */}
       
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
