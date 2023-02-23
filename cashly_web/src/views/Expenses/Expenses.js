import { useReducer } from 'react'
import { useQuery } from 'react-query'

import { expenseService } from '@/api/services'
import PageMain from '@/components/PageMain/PageMain'
import MainLayout from '@/layouts/MainLayout/MainLayout'

import List from './components/List/List'
import ListOptions from './components/ListOptions/ListOptions'
import * as actions from './components/ListOptions/actions'
import { ListOptionsProvider } from './components/ListOptions/context'
import { usePersistedListOptionsState } from './components/ListOptions/hooks/usePersistedListOptionsState'
import {
    initialState,
    listOptionsReducer,
} from './components/ListOptions/reducer'
import PageHeader from './components/PageHeader/PageHeader'

export default function Expenses() {
    const {
        showFilterOptionsSection,
        showSortOptionsSection,
        sortParams,
        filterParams,
    } = usePersistedListOptionsState()

    const [state, dispatch] = useReducer(listOptionsReducer, {
        ...initialState,
        showFilterOptionsSection,
        showSortOptionsSection,
        sortParams,
        filterParams,
    })

    const getAllExpensesQuery = useQuery(
        'expenses',
        expenseService.getAllExpenses,
        {
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                dispatch({
                    type: actions.FETCH_EXPENSES_SUCCESS,
                    payload: data,
                })
                dispatch({
                    type: actions.APPLY_FILTER_OPTIONS,
                })
                dispatch({
                    type: actions.APPLY_SORT_OPTIONS,
                })
            },
        }
    )

    const isEmpty = !Boolean(
        getAllExpensesQuery.data && getAllExpensesQuery.data.length
    )
    const showHeaderActions = !isEmpty

    return (
        <MainLayout>
            <PageHeader showActions={showHeaderActions} />
            <PageMain>
                <ListOptionsProvider reducer={[state, dispatch]}>
                    {!isEmpty && <ListOptions />}
                    <List
                        data={state.expenses}
                        isEmpty={isEmpty}
                        isLoading={
                            getAllExpensesQuery.isLoading ||
                            getAllExpensesQuery.isError
                        }
                    />
                </ListOptionsProvider>
            </PageMain>
        </MainLayout>
    )
}
