import { ReactNode } from 'react';
import { useUser } from '@/shared/contexts/user-context';

interface UserContentProps {
  guestContent?: ReactNode;
  freeContent?: ReactNode;
  paidContent?: ReactNode;
  fallback?: ReactNode;
  children?: ReactNode;
}

export function UserContent({ 
  guestContent, 
  freeContent, 
  paidContent, 
  fallback, 
  children 
}: UserContentProps) {
  const { userType } = useUser();
  
  // If children provided, use as fallback
  const defaultContent = children || fallback;
  
  switch (userType) {
    case 'guest':
      return <>{guestContent || defaultContent}</>;
    case 'free':
      return <>{freeContent || defaultContent}</>;
    case 'paid':
      return <>{paidContent || defaultContent}</>;
    default:
      return <>{defaultContent}</>;
  }
}
