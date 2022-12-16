import axios from 'axios';

import config from '@/config';
import { accessTokenStorage, logoutEvent } from '@/helpers/session';

const apiClient = axios.create({
  baseURL: config.apiURL,
});

apiClient.interceptors.request.use((config) => {
  const accessToken = accessTokenStorage.get();
  if (accessToken) config.headers['Authorization'] = `Bearer ${accessToken}`;
  return config;
});

apiClient.interceptors.response.use(undefined, (err) => {
  if (err.response && err.response.status === 401) {
    window.dispatchEvent(logoutEvent);
  }

  return Promise.reject(err);
});

export default apiClient;
