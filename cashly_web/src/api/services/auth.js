import apiClient from '../client'

export const login = (payload = { email, password }) =>
    apiClient.post('/auth/login', payload).then(({ data }) => data.access_token)

export const register = (payload = { email, password }) =>
    apiClient.post('/auth/register', payload)

export const passwordRecoveryRequest = (payload = { email }) =>
    apiClient.post('/auth/passwordrecovery', payload)

export const passwordRecoveryProceed = (
    payload = { password, passwordRecoveryToken }
) =>
    apiClient.put('/auth/passwordrecovery', {
        password: payload.password,
        password_recovery_token: payload.passwordRecoveryToken,
    })
