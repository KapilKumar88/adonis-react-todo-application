import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { UserDetails } from '@/types/user.types';

interface UserProfileContextType {
  userInfo: UserDetails | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  setUserInfo: React.Dispatch<React.SetStateAction<UserDetails | null>>;
}

const UserProfileContext = createContext<UserProfileContextType>({} as UserProfileContextType);

export const UserProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserDetails | null>(() => {
    try {
      const stored = localStorage.getItem('user_profile');
      return stored ? (JSON.parse(stored) as UserDetails) : null;
    } catch {
      return null;
    }
  });

  const value = useMemo(() => ({
    userInfo,
    isAuthenticated: !!userInfo,
    isAdmin: userInfo?.role === 'admin',
    setUserInfo
  }), [userInfo, setUserInfo]);


  useEffect(() => {
    if (userInfo) {
      localStorage.setItem('user_profile', JSON.stringify(userInfo));
    }
  }, [userInfo]);

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext);
