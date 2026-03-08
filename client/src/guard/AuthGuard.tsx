import { DEFAULT_ROLES } from '@/constants/role.constant';
import { useUserProfile } from '@/context/UserProfileContext';
import React from 'react';
import { Navigate } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: typeof DEFAULT_ROLES[keyof typeof DEFAULT_ROLES];
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, requiredRole }) => {
  const { userInfo, isAuthenticated } = useUserProfile();


  if (!isAuthenticated) {
    return <Navigate to={requiredRole === DEFAULT_ROLES.SUPER_ADMIN ? '/admin/login' : '/login'} replace />;
  }

  if (requiredRole === DEFAULT_ROLES.SUPER_ADMIN && userInfo?.role !== DEFAULT_ROLES.SUPER_ADMIN) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
