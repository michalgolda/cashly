import CredentialsProvider from 'next-auth/providers/credentials'

import { authService, userService } from '@/api/services'

export const authOptions = {
    pages: {
        signIn: '/login',
    },
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'E-mail', type: 'email' },
                password: { label: 'Hasło', type: 'password' },
            },
            async authorize(credentials) {
                const accessToken = await authService
                    .login({
                        email: credentials.email,
                        password: credentials.password,
                    })
                    .catch(({ response }) => {
                        if (response) {
                            const { message } = response.data
                            if (message) throw new Error(message)
                        }
                    })

                const user = await userService.getCurrentUser({ accessToken })

                if (user) {
                    return {
                        ...user,
                        accessToken,
                    }
                } else {
                    return null
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            user && (token.user = user)
            return token
        },
        async session({ session, token }) {
            const accessToken = token.user.accessToken
            if (accessToken) {
                const user = await userService.getCurrentUser({ accessToken })
                token.user = { accessToken, ...user }
            }

            session.user = { ...token.user }
            return session
        },
    },
}
