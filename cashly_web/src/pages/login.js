import Head from 'next/head'

import { withUnauthenticatedUser } from '@/lib/withUnauthentiactedUser'
import Login from '@/views/Auth/Login/Login'

function LoginPage() {
    return (
        <>
            <Head>
                <title>Cashly - logowanie</title>
            </Head>
            <Login />
        </>
    )
}

export default withUnauthenticatedUser(LoginPage)
