import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { authAPI, userAPI } from "@/api";
import { accessTokenStorage } from "@/helpers/session";

export const useSessionProvider = () => {
  const currentUserQuery = useQuery("currentUser", userAPI.getCurrentUser, {
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    enabled: Boolean(accessTokenStorage.get()),
  });
  const loginMutation = useMutation("login", authAPI.login, {
    onSuccess: (accessToken) => {
      accessTokenStorage.set(accessToken);
      currentUserQuery
        .refetch()
        .then(({ isSuccess }) => isSuccess && navigate("/", { replace: true }));
    },
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const login = (loginBody) => loginMutation.mutateAsync(loginBody);

  const logout = () => {
    queryClient.clear();
    accessTokenStorage.clear();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    window.addEventListener("logout", () => logout());
    window.addEventListener("storage", () => {
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
