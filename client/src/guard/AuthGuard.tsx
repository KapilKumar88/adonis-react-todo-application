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

  console.log('AuthGuard - userInfo:', userInfo, 'requiredRole:', requiredRole);

  // if (requiredRole === DEFAULT_ROLES.SUPER_ADMIN && userInfo?.role?.name === DEFAULT_ROLES.SUPER_ADMIN) {
  //   return <Navigate to="/admin/dashboard" replace />;
  // } else if (requiredRole && userInfo?.role?.name !== requiredRole) {
  //   return <Navigate to="/dashboard" replace />;
  // }

  return <>{children}</>;
};

export default AuthGuard;
