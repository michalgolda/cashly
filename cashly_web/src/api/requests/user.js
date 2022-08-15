import apiClient from "@/api/client";

export const getCurrentUser = () =>
  apiClient.get("/users/me").then((res) => res.data);
