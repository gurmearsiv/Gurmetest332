import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '../types/User';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, university: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean;
  isStudentEmail: (email: string) => boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

// University domains for validation
const UNIVERSITY_DOMAINS = [
  'edu.tr', 'edu', 'ac.uk', 'edu.au', 'edu.cn', 
  'uni-muenchen.de', 'tu-berlin.de', 'itu.edu.tr', 'metu.edu.tr',
  'boun.edu.tr', 'sabanciuniv.edu', 'bilkent.edu.tr'
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check local storage for existing user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const isStudentEmail = (email: string): boolean => {
    return UNIVERSITY_DOMAINS.some(domain => email.toLowerCase().endsWith(domain));
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Validate university email
      if (!isStudentEmail(email)) {
        throw new Error('Only university email addresses are allowed');
      }

      // This would be a real API call in production
      // For demo purposes, we're simulating a successful login
      const mockUser: User = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email,
        university: email.split('@')[1],
        avatarUrl: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`,
        isOnline: true,
        lastSeen: new Date().toISOString(),
        joinedAt: new Date().toISOString()
      };

      // Store user in local storage
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, university: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Validate university email
      if (!isStudentEmail(email)) {
        throw new Error('Only university email addresses are allowed');
      }

      // This would be a real API call in production
      // For demo purposes, we're simulating a successful registration
      const mockUser: User = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        name,
        email,
        university,
        avatarUrl: `https://ui-avatars.com/api/?name=${name}&background=random`,
        isOnline: true,
        lastSeen: new Date().toISOString(),
        joinedAt: new Date().toISOString()
      };

      // Store user in local storage
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      error, 
      login, 
      register, 
      logout, 
      isAuthenticated, 
      isStudentEmail 
    }}>
      {children}
    </AuthContext.Provider>
  );
};