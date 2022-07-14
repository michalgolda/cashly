import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/auth";

export const setAccessToken = (accessToken) =>
  localStorage.setItem("accessToken", accessToken);

export const getAccessToken = () => localStorage.getItem("accessToken");

export const removeAccessToken = () => localStorage.removeItem("accessToken");

export const logoutEvent = new CustomEvent("logout");

export const AuthRequired = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export const AuthRedirect = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};
