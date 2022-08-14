import { useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { authAPI, userAPI } from "@/api";
import { accessTokenStorage } from "@/helpers/session";

export const useSessionProvider = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const getCurrentUserWrapper = () =>
    userAPI
      .getCurrentUser()
      .then((user) => setUser(user))
      .catch(() => setUser(null));

  const login = (loginBody) =>
    authAPI.login(loginBody).then((accessToken) => {
      accessTokenStorage.set(accessToken);
      getCurrentUserWrapper().then(() => navigate("/", { replace: true }));
    });

  const logout = () => {
    setUser(null);
    queryClient.clear();
    accessTokenStorage.clear();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    getCurrentUserWrapper();

    window.addEventListener("logout", () => logout());
    window.addEventListener("storage", () =>
      accessTokenStorage.get() ? getCurrentUserWrapper() : logout()
    );
  }, []);

  return {
    user,
    login,
    logout,
  };
};
