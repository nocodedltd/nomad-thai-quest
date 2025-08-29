import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserType, UserState, getUserAccess } from '@/types/user';

interface UserContextType {
  userType: UserType;
  setUserType: (type: UserType) => void;
  userState: UserState;
  isGuest: boolean;
  isFree: boolean;
  isPaid: boolean;
  isDevelopment: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const mockProgress = {
  currentPhase: 2,
  completedPhases: [1],
  totalXP: 1250,
  completedLessons: 8,
  totalLessons: 45,
  achievements: [
    {
      id: '1',
      title: 'First Steps',
      description: 'Completed your first lesson',
      icon: '🎯',
      unlockedAt: new Date(),
    },
    {
      id: '2',
      title: 'Income Explorer',
      description: 'Started exploring income options',
      icon: '💰',
      unlockedAt: new Date(),
    },
  ],
};

export function UserProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage or default to guest
  const [userType, setUserType] = useState<UserType>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nomad-thai-quest-user-type');
      return (saved as UserType) || 'guest';
    }
    return 'guest';
  });
  // More robust development detection
  const isDevelopment = process.env.NODE_ENV === 'development' || 
                       process.env.NODE_ENV !== 'production' ||
                       window.location.hostname === 'localhost' ||
                       window.location.hostname === '127.0.0.1' ||
                       window.location.hostname.includes('github.io') ||
                       window.location.hostname.includes('vercel.app');
  
  const userState: UserState = {
    type: userType,
    progress: mockProgress,
    access: getUserAccess(userType),
  };

  // Enhanced setUserType with localStorage persistence
  const handleSetUserType = (type: UserType) => {
    setUserType(type);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nomad-thai-quest-user-type', type);
    }
  };

  const value: UserContextType = {
    userType,
    setUserType: handleSetUserType,
    userState,
    isGuest: userType === 'guest',
    isFree: userType === 'free',
    isPaid: userType === 'paid',
    isDevelopment,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
