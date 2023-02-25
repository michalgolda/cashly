import apiClient from '../client'

export const getCurrentUser = (payload = { accessToken }) =>
    apiClient
        .get('/users/me', {
            headers: { Authorization: `Bearer ${payload.accessToken}` },
        })
        .then((res) => res.data)

export const verifyEmail = (payload = { emailVerificationToken }) =>
    apiClient.post('/users/verify/email', {
        email_verification_token: payload.emailVerificationToken,
    })

export const sendEmailVerificationRequest = (payload = { email }) =>
    apiClient.post('/users/verify/email/request', payload)
