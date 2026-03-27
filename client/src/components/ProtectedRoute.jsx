import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roles }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    // Redirect to their correct dashboard
    const redirectMap = { admin: '/admin', teacher: '/teacher', student: '/student' };
    return <Navigate to={redirectMap[user.role] || '/login'} replace />;
  }

  return children;
};

export default ProtectedRoute;
