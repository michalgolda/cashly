import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { authAPI, userAPI } from '@/api';
import { accessTokenStorage, logoutEvent } from '@/helpers/session';

export const useSessionProvider = () => {
  const currentUserQuery = useQuery('currentUser', userAPI.getCurrentUser, {
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    enabled: Boolean(accessTokenStorage.get()),
  });
  const loginMutation = useMutation('login', authAPI.login, {
    onSuccess: (accessToken) => {
      accessTokenStorage.set(accessToken);
      currentUserQuery.refetch().then(({ isSuccess }) => {
        if (isSuccess) navigate('/', { replace: true });
      });
    },
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const login = (loginBody) => loginMutation.mutateAsync(loginBody);

  const logout = () => window.dispatchEvent(logoutEvent);

  useEffect(() => {
    window.addEventListener('logout', () => {
      queryClient.clear();
      accessTokenStorage.clear();
      navigate('/login', { replace: true });
    });
    window.addEventListener('storage', () => {
      const accessToken = accessTokenStorage.get();
      accessToken && currentUserQuery.refetch();
      !accessToken && logout();
    });
  }, []);

  return {
    login,
    logout,
    user: currentUserQuery.data,
    isLoading: currentUserQuery.isLoading,
  };
};
