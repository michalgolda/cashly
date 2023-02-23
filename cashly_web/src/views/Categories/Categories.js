import { useQuery } from 'react-query'

import { expenseCategoryService } from '@/api/services'
import PageMain from '@/components/PageMain/PageMain'
import MainLayout from '@/layouts/MainLayout/MainLayout'

import List from './components/List/List'
import PageHeader from './components/PageHeader/PageHeader'

export default function Categories() {
    const getAllExpenseCategoriesQuery = useQuery(
        'categories',
        expenseCategoryService.getAllExpenseCategories
    )

    const isEmpty = !Boolean(
        getAllExpenseCategoriesQuery.data &&
            getAllExpenseCategoriesQuery.data.length
    )
    const showHeaderActions = !isEmpty

    return (
        <MainLayout>
            <PageHeader showActions={showHeaderActions} />
            <PageMain>
                <List
                    data={getAllExpenseCategoriesQuery.data}
                    isEmpty={isEmpty}
                    isLoading={
                        getAllExpenseCategoriesQuery.isLoading ||
                        getAllExpenseCategoriesQuery.isError
                    }
                />
            </PageMain>
        </MainLayout>
    )
}
