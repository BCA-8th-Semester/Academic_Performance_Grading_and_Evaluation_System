// routes/PrivateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, element }) => {
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
