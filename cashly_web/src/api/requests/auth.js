import apiClient from "@/api/client";

export const login = ({ email, password }) =>
  apiClient
    .post("/auth/login", { email, password })
    .then(({ data }) => data.access_token);

export const register = ({ email, password }) =>
  apiClient.post("/auth/register", { email, password });

export const forgotPassword = ({ email }) =>
  apiClient.post("/auth/forgotpassword", { email });

export const resetPassword = ({ password, token }) =>
  apiClient.post("/auth/resetpassword", { password, token });
