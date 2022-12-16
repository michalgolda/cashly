import { Navigate } from 'react-router-dom';

import { LoadingCurtain } from '@/components';
import { useSession } from '@/hooks/useSession';

export default function AuthRequired({ children }) {
  const { user, isLoading } = useSession();
  return isLoading ? (
    <LoadingCurtain />
  ) : user ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
}
