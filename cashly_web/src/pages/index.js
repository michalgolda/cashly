import { useQuery } from 'react-query'

import { expenseService } from '@/api/services'
import MainLayout from '@/layouts/MainLayout/MainLayout'
import { withAuthenticatedUser } from '@/lib/withAuthenticatedUser'

export default function Home() {
    const getAllExpensesQuery = useQuery(
        'expenses',
        expenseService.getAllExpenses
    )
    console.log(getAllExpensesQuery)

    return <MainLayout />
}

export const getServerSideProps = withAuthenticatedUser()
