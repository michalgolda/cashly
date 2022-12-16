import { Navigate } from 'react-router-dom';

import { LoadingCurtain } from '@/components';
import { useSession } from '@/hooks/useSession';

export default function AuthRedirect({ children }) {
  const { user, isLoading } = useSession();
  return isLoading ? (
    <LoadingCurtain />
  ) : user ? (
    <Navigate to="/" replace />
  ) : (
    children
  );
}
