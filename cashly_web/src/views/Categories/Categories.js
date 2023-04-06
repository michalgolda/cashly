import PageMain from '@/components/PageMain/PageMain'
import MainLayout from '@/layouts/MainLayout/MainLayout'

import List from './components/List/List'
import PageHeader from './components/PageHeader/PageHeader'
import { useGetAllExpenseCategoriesQuery } from './useGetAllExpenseCategoriesQuery'

export default function Categories() {
    const { isLoading, isError, data } = useGetAllExpenseCategoriesQuery()

    const isEmpty = !Boolean(data && data.length)
    const showHeaderActions = !isEmpty

    return (
        <MainLayout>
            <PageHeader showActions={showHeaderActions} />
            <PageMain>
                <List
                    data={data}
                    isEmpty={isEmpty}
                    isLoading={isLoading || isError}
                />
            </PageMain>
        </MainLayout>
    )
}
