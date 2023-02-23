import Head from 'next/head'

import { withAuthenticatedUser } from '@/lib/withAuthenticatedUser'
import Analytics from '@/views/Analytics/Analytics'

export default function AnalyticsPage() {
    return (
        <>
            <Head>
                <title>Cashly - analityka</title>
            </Head>
            <Analytics />
        </>
    )
}

export const getServerSideProps = withAuthenticatedUser()
