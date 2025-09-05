import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Assignment } from '../services/api';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  promotion?: string; // Pour les étudiants
  department?: string; // Pour les enseignants
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  assignments: Assignment[];
  setAssignments: React.Dispatch<React.SetStateAction<Assignment[]>>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulation de l'authentification avec différents types d'utilisateurs
    const users = {
      'student@example.com': {
        id: '1',
        name: 'Djeukeng Kana',
        email: 'student@example.com',
        role: 'student' as const,
        promotion: 'L3 RT',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
      },
      'teacher@example.com': {
        id: '2',
        name: 'M. Atemengue ',
        email: 'teacher@example.com',
        role: 'teacher' as const,
        department: 'Informatique',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
      },
      'admin@example.com': {
        id: '3',
        name: 'Admin Système',
        email: 'admin@example.com',
        role: 'admin' as const,
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
      }
    };

    if (password === 'password' && users[email as keyof typeof users]) {
      setUser(users[email as keyof typeof users]);
      setToken('mock-token-123');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setAssignments([]);
  };

  const value: AuthContextType = {
    user,
    token,
    assignments,
    setAssignments,
    login,
    logout,
    isAuthenticated: !!user && !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;