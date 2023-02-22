import Head from 'next/head'

import { withUnauthenticatedUser } from '@/lib/withUnauthentiactedUser'
import Login from '@/views/Auth/Login/Login'

export default function LoginPage() {
    return (
        <>
            <Head>
                <title>Cashly - logowanie</title>
            </Head>
            <Login />
        </>
    )
}

export const getServerSideProps = withUnauthenticatedUser()
