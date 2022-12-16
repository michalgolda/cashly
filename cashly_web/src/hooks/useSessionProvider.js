import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { authAPI, userAPI } from '@/api';
import { accessTokenStorage } from '@/helpers/session';

export const useSessionProvider = () => {
  const notifyLoginSuccess = () =>
    toast.success('Zostałeś pomyślnie zalogowany');

  const notifyLogoutSuccess = () =>
    toast.success('Zostałeś pomyślnie wylogowany');

  const currentUserQuery = useQuery('currentUser', userAPI.getCurrentUser, {
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    enabled: Boolean(accessTokenStorage.get()),
  });
  const loginMutation = useMutation('login', authAPI.login, {
    onSuccess: (accessToken) => {
      accessTokenStorage.set(accessToken);
      currentUserQuery.refetch().then(({ isSuccess }) => {
        if (isSuccess) {
          notifyLoginSuccess();
          navigate('/', { replace: true });
        }
      });
    },
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const login = (loginBody) => loginMutation.mutateAsync(loginBody);

  const logout = () => {
    queryClient.clear();
    accessTokenStorage.clear();
    notifyLogoutSuccess();
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    window.addEventListener('logout', () => logout());
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
