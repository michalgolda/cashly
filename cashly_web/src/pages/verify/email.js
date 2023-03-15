import Head from 'next/head'

import VerifyEmail from '@/views/VerifyEmail/VerifyEmail'

export default function VerifyEmailPage() {
    return (
        <>
            <Head>
                <title>Cashly - Weryfikacja adresu e-mail</title>
            </Head>
            <VerifyEmail />
        </>
    )
}
