import Head from 'next/head'

import { withAuthenticatedUser } from '@/lib/withAuthenticatedUser'
import Expenses from '@/views/Expenses/Expenses'

export default function ExpensesPage() {
    return (
        <>
            <Head>
                <title>Cashly - wydatki</title>
            </Head>
            <Expenses />
        </>
    )
}

export const getServerSideProps = withAuthenticatedUser()
