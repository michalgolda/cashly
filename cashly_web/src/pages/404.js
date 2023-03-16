import Head from 'next/head'

import Meta from '@/components/Meta'
import NotFound from '@/views/NotFound/NotFound'

export default function NotFoundPage() {
    return (
        <>
            <Meta title="404" />
            <NotFound />
        </>
    )
}
