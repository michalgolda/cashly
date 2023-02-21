import apiClient from '../client'

export const getCurrentUser = (payload = { accessToken }) =>
    apiClient
        .get('/users/me', {
            headers: { Authorization: `Bearer ${payload.accessToken}` },
        })
        .then((res) => res.data)
