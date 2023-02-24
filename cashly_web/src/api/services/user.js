import apiClient from '../client'

export const getCurrentUser = (payload = { accessToken }) =>
    apiClient
        .get('/users/me', {
            headers: { Authorization: `Bearer ${payload.accessToken}` },
        })
        .then((res) => res.data)

export const sendEmailVerificationRequest = (payload = { email }) =>
    apiClient.post('/users/verify/email/request', payload)
