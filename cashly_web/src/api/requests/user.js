import apiClient from '@/api/client';

export const getCurrentUser = () =>
  apiClient.get('/users/me').then((res) => res.data);

export const verifyEmail = ({ emailVerificationToken }) =>
  apiClient.post('/users/verify/email', {
    email_verification_token: emailVerificationToken,
  });

export const sendEmailVerificationRequest = ({ email }) =>
  apiClient.post('/users/verify/email/request', { email });
