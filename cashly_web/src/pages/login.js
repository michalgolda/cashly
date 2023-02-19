import Head from 'next/head'

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
