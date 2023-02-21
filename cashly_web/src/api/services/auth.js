import apiClient from '../client'

export const login = (payload = { email, password }) =>
    apiClient.post('/auth/login', payload).then(({ data }) => data.access_token)

export const register = (payload = { email, password }) =>
    apiClient.post('/auth/register', payload)
