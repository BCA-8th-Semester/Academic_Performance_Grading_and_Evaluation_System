// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './component/Dashboard';
import Login from './Login'; // Import your Login component


function App() {
  return (
    <Router>
      <Routes>
         
        <Route path="/" element={<Login />} /> {/* Login route */}
        <Route path="/dashboard" element={<Dashboard />} />
       
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
