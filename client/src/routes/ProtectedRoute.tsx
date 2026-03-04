import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'user' | 'admin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, currentUser, loading } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to={requiredRole === 'admin' ? '/admin/login' : '/login'} replace />;
  }

  if (requiredRole === 'admin' && currentUser?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
