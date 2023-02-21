import Head from 'next/head'

import { withUnauthenticatedUser } from '@/lib/withUnauthentiactedUser'
import Register from '@/views/Auth/Register/Register'

function RegisterPage() {
    return (
        <>
            <Head>
                <title>Cashly - rejestracja</title>
            </Head>
            <Register />
        </>
    )
}

export default withUnauthenticatedUser(RegisterPage)
