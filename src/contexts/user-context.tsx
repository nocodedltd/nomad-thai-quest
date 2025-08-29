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
  const [userType, setUserType] = useState<UserType>('guest');
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  const userState: UserState = {
    type: userType,
    progress: mockProgress,
    access: getUserAccess(userType),
  };

  const value: UserContextType = {
    userType,
    setUserType,
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
