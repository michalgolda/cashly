import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { authAPI, userAPI } from "@/api";
import { setAccessToken, removeAccessToken, getAccessToken } from "@/utils";
import { useQueryClient } from "react-query";

export const AuthContext = createContext();

export const useAuthProvider = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    getAccessToken() ? true : false
  );
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const fetchCurrentUser = () =>
    userAPI
      .getCurrentUser()
      .then((user) => {
        setUser(user);
        setIsAuthenticated(true);
      })
      .catch(() => {
        setUser(null);
        setIsAuthenticated(false);
      });

  const login = ({ email, password }) =>
    authAPI.getAccessToken({ email, password }).then((accessToken) => {
      setAccessToken(accessToken);
      fetchCurrentUser().then(() => navigate("/", { replace: true }));
    });

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    removeAccessToken();
    navigate("/login", { replace: true });

    queryClient.clear();
  }, []);

  useEffect(() => {
    fetchCurrentUser();

    window.addEventListener("logout", () => logout());
    window.addEventListener("storage", () => {
      const accessToken = getAccessToken();
      accessToken ? fetchCurrentUser() : logout();
    });
  }, []);

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
