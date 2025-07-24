// App.js

import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Signup from './component/signup';
import Dashboard from './component/Dashboard';
import RefrshHandler from './RefrshHandler';
import Login from './component/login'; // ✅ Corrected import

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="App">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<Login />} /> {/* ✅ Fixed component name */}
        <Route path='/signup' element={<Signup />} />
        <Route 
          path='/dashboard' 
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
          } 
        />
        <Route path='*' element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
