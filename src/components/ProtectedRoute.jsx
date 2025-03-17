// ProtectedRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('authentication');

  if (!isAuthenticated) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/" state={{ showLoginModal: true, from: location }} replace />;
  }

  // Render the protected content if authenticated
  return children;
};

export default ProtectedRoute;