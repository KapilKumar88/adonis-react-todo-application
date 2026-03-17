import { useUserProfile } from '@/context/UserProfileContext';
import { SYSTEM_ROLES } from '@/types/role.types';
import React from 'react';
import { Navigate } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: typeof SYSTEM_ROLES[keyof typeof SYSTEM_ROLES];
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, requiredRole }) => {
  const { userInfo, isAuthenticated } = useUserProfile();

  if (!isAuthenticated) {
    return <Navigate to={requiredRole === SYSTEM_ROLES.SUPER_ADMIN ? '/admin/login' : '/login'} replace />;
  }

  const userRole = userInfo?.roles?.name ?? SYSTEM_ROLES.USER;

  // Non-admin trying to access an admin-only route
  if (requiredRole === SYSTEM_ROLES.SUPER_ADMIN && userRole !== SYSTEM_ROLES.SUPER_ADMIN) {
    return <Navigate to="/dashboard" replace />;
  }

  // Admin trying to access a user-only route
  if (requiredRole === SYSTEM_ROLES.USER && userRole === SYSTEM_ROLES.SUPER_ADMIN) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
