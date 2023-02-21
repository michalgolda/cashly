import axios from 'axios'
import { getSession, signOut } from 'next-auth/react'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const apiClient = axios.create({
    baseURL: publicRuntimeConfig.apiURL,
})

apiClient.interceptors.request.use(async (config) => {
    const session = await getSession()
    if (session)
        config.headers['Authorization'] = `Bearer ${session.user.accessToken}`
    return config
})

apiClient.interceptors.response.use(undefined, (error) => {
    if (error.response && error.response.status)
        signOut({ callbackUrl: '/login' })

    return Promise.reject(error)
})

export default apiClient
