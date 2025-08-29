export type UserType = 'guest' | 'free' | 'paid';

export interface UserAccess {
  canAccessRoadmap: boolean;
  canAccessIncome: boolean;
  canAccessVisa: boolean;
  canAccessLiving: boolean;
  canAccessProgress: boolean;
  unlockedPhases: number[];
  courseAccess: {
    amazonFBA: 'none' | 'preview' | 'full';
    aiAutomation: 'none' | 'preview' | 'full';
    visaGuide: 'none' | 'preview' | 'full';
  };
}

export interface UserProgress {
  currentPhase: number;
  completedPhases: number[];
  totalXP: number;
  completedLessons: number;
  totalLessons: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
}

export interface UserState {
  type: UserType;
  progress: UserProgress;
  access: UserAccess;
}

export const getUserAccess = (userType: UserType): UserAccess => {
  switch (userType) {
    case 'guest':
      return {
        canAccessRoadmap: true, // Preview only
        canAccessIncome: false,
        canAccessVisa: false,
        canAccessLiving: false,
        canAccessProgress: false,
        unlockedPhases: [],
        courseAccess: {
          amazonFBA: 'none',
          aiAutomation: 'none',
          visaGuide: 'none',
        },
      };
    case 'free':
      return {
        canAccessRoadmap: true,
        canAccessIncome: true,
        canAccessVisa: true,
        canAccessLiving: true,
        canAccessProgress: true,
        unlockedPhases: [1, 2],
        courseAccess: {
          amazonFBA: 'preview',
          aiAutomation: 'preview',
          visaGuide: 'full',
        },
      };
    case 'paid':
      return {
        canAccessRoadmap: true,
        canAccessIncome: true,
        canAccessVisa: true,
        canAccessLiving: true,
        canAccessProgress: true,
        unlockedPhases: [1, 2, 3, 4, 5],
        courseAccess: {
          amazonFBA: 'full',
          aiAutomation: 'full',
          visaGuide: 'full',
        },
      };
  }
};
