import Head from 'next/head'

import { withUnauthenticatedUser } from '@/lib/withUnauthentiactedUser'
import PasswordRecovery from '@/views/PasswordRecovery/PasswordRecovery'

export default function PasswordRecoveryPage() {
    return (
        <>
            <Head>
                <title>Cashly - resetowanie hasła</title>
            </Head>
            <PasswordRecovery />
        </>
    )
}

export const getServerSideProps = withUnauthenticatedUser()
