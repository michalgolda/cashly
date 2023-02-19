import Head from 'next/head'

import NotFound from '@/views/NotFound/NotFound'

export default function NotFoundPage() {
    return (
        <>
            <Head>
                <title>Cashly - 404</title>
            </Head>
            <NotFound />
        </>
    )
}
