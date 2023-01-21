import { useReducer } from 'react';
import { useQuery } from 'react-query';

import { expenseAPI } from '@/api';
import { Page, PageMain } from '@/components';
import { MainLayout } from '@/layouts';

import ExpenseList from './ExpenseList/ExpenseList';
import ExpenseListOptions from './ExpenseList/ExpenseListOptions/ExpenseListOptions';
import * as expenseListOptionsActions from './ExpenseList/ExpenseListOptions/ExpenseListOptionsActions';
import { ExpenseListOptionsProvider } from './ExpenseList/ExpenseListOptions/ExpenseListOptionsContext';
import {
  expenseListOptionsReducer,
  initialState,
} from './ExpenseList/ExpenseListOptions/ExpenseListOptionsReducer';
import { usePersistedExpenseListOptionsState } from './ExpenseList/ExpenseListOptions/usePersistedExpenseListOptionsState';
import ExpensePageHeader from './ExpensePageHeader/ExpensePageHeader';

export default function Expenses() {
  const {
    showFilterOptionsSection,
    showSortOptionsSection,
    sortParams,
    filterParams,
  } = usePersistedExpenseListOptionsState();

  const [state, dispatch] = useReducer(expenseListOptionsReducer, {
    ...initialState,
    showFilterOptionsSection,
    showSortOptionsSection,
    sortParams,
    filterParams,
  });

  const getAllExpensesQuery = useQuery('expenses', expenseAPI.getAllExpenses, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      dispatch({
        type: expenseListOptionsActions.FETCH_EXPENSES_SUCCESS,
        payload: data,
      });
      dispatch({
        type: expenseListOptionsActions.APPLY_FILTER_OPTIONS,
      });
      dispatch({
        type: expenseListOptionsActions.APPLY_SORT_OPTIONS,
      });
    },
  });

  const isEmpty = !Boolean(
    getAllExpensesQuery.data && getAllExpensesQuery.data.length,
  );
  const showHeaderActions = !isEmpty;

  return (
    <Page title="Cashly - Wydatki">
      <MainLayout>
        <ExpensePageHeader showActions={showHeaderActions} />
        <PageMain>
          <ExpenseListOptionsProvider reducer={[state, dispatch]}>
            {!isEmpty && <ExpenseListOptions />}
            <ExpenseList
              data={state.expenses}
              isEmpty={isEmpty}
              isLoading={
                getAllExpensesQuery.isLoading || getAllExpensesQuery.isError
              }
            />
          </ExpenseListOptionsProvider>
        </PageMain>
      </MainLayout>
    </Page>
  );
}
