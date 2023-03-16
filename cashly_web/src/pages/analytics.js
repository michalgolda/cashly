import Meta from '@/components/Meta'
import { withAuthenticatedUser } from '@/lib/withAuthenticatedUser'
import Analytics from '@/views/Analytics/Analytics'

export default function AnalyticsPage() {
    return (
        <>
            <Meta title="Analityka" />
            <Analytics />
        </>
    )
}

export const getServerSideProps = withAuthenticatedUser()
