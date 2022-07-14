import axios from "axios";
import config from "@/config";
import { getAccessToken, logoutEvent } from "@/utils";

const apiClient = axios.create({
  baseURL: config.apiURL,
});

apiClient.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`;
  return config;
});

apiClient.interceptors.response.use(undefined, (err) => {
  if (err.response && err.response.status === 401) {
    window.dispatchEvent(logoutEvent);
  }

  return Promise.reject(err);
});

export default apiClient;
