import Head from 'next/head'

import VerifyEmail from '@/views/VerifyEmail/VerifyEmail'

export default function VerifyEmailPage() {
    return (
        <>
            <Head>
                <title>Cashly - weryfikacja adresu e-mail</title>
            </Head>
            <VerifyEmail />
        </>
    )
}
