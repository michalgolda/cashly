import Meta from '@/components/Meta'
import { withAuthenticatedUser } from '@/lib/withAuthenticatedUser'
import Expenses from '@/views/Expenses/Expenses'

export default function ExpensesPage() {
    return (
        <>
            <Meta title="Wydatki" />
            <Expenses />
        </>
    )
}

export const getServerSideProps = withAuthenticatedUser()
