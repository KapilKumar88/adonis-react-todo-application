import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { users as mockUsers } from '@/utils/mockData';
import { generateId } from '@/utils/helpers';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, password: string) => boolean;
  resetPassword: (email: string) => boolean;
  updateProfile: (data: Partial<User>) => void;
  allUsers: User[];
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allUsers, setAllUsers] = useLocalStorage<User[]>('todo-users', mockUsers);
  const [currentUserId, setCurrentUserId] = useLocalStorage<string | null>('todo-current-user', null);
  const [loading, setLoading] = useState(true);

  const currentUser = allUsers.find(u => u.id === currentUserId) || null;

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = useCallback((email: string, password: string): boolean => {
    const user = allUsers.find(u => u.email === email && u.password === password);
    if (!user) return false;
    if (user.status !== 'active') {
      toast({ title: 'Account Disabled', description: 'Your account is not active.', variant: 'destructive' });
      return false;
    }
    setAllUsers(prev => prev.map(u => u.id === user.id ? { ...u, lastLogin: new Date().toISOString() } : u));
    setCurrentUserId(user.id);
    return true;
  }, [allUsers, setAllUsers, setCurrentUserId]);

  const logout = useCallback(() => {
    setCurrentUserId(null);
  }, [setCurrentUserId]);

  const register = useCallback((name: string, email: string, password: string): boolean => {
    if (allUsers.some(u => u.email === email)) return false;
    const newUser: User = {
      id: generateId(),
      name,
      email,
      password,
      role: 'user',
      permissions: [],
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    setAllUsers(prev => [...prev, newUser]);
    return true;
  }, [allUsers, setAllUsers]);

  const resetPassword = useCallback((email: string): boolean => {
    return allUsers.some(u => u.email === email);
  }, [allUsers]);

  const updateProfile = useCallback((data: Partial<User>) => {
    if (!currentUserId) return;
    setAllUsers(prev => prev.map(u => u.id === currentUserId ? { ...u, ...data } : u));
  }, [currentUserId, setAllUsers]);

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated: !!currentUser,
      isAdmin: currentUser?.role === 'admin',
      loading,
      login, logout, register, resetPassword, updateProfile,
      allUsers, setAllUsers,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
