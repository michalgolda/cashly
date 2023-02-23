import Head from 'next/head'

import { withAuthenticatedUser } from '@/lib/withAuthenticatedUser'
import Categories from '@/views/Categories/Categories'

export default function CategoriesPage() {
    return (
        <>
            <Head>
                <title>Cashly - kategorie</title>
            </Head>
            <Categories />
        </>
    )
}

export const getServerSideProps = withAuthenticatedUser()