import Head from 'next/head'

import { withUnauthenticatedUser } from '@/lib/withUnauthentiactedUser'
import Register from '@/views/Auth/Register/Register'

export default function RegisterPage() {
    return (
        <>
            <Head>
                <title>Cashly - Rejestracja</title>
            </Head>
            <Register />
        </>
    )
}

export const getServerSideProps = withUnauthenticatedUser()
