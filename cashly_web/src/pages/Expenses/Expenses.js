import { useQuery } from 'react-query';

import moment from 'moment';

import { expenseAPI } from '@/api';
import { Page, PageMain } from '@/components';
import { MainLayout } from '@/layouts';

import ExpenseList from './ExpenseList/ExpenseList';
import { ExpenseListOptionsProvider } from './ExpenseList/ExpenseListOptions/ExpenseListOptionsContext';
import { useExpenseListOptionsProvider } from './ExpenseList/ExpenseListOptions/useExpenseListOptionsProvider';
import ExpensePageHeader from './ExpensePageHeader/ExpensePageHeader';

export default function Expenses() {
  const expenseListOptionsProvider = useExpenseListOptionsProvider();
  const getAllExpensesQuery = useQuery('expenses', expenseAPI.getAllExpenses, {
    select: (expenses) => {
      const { filterParams, sortParams } = expenseListOptionsProvider;

      expenses = expenses.filter((expense) => {
        if (filterParams.category === 'all') return true;
        if (filterParams.category === '') return !expense.category;
        return expense.category
          ? expense.category.name === filterParams.category
          : false;
      });

      expenses = expenses.filter((expense) => {
        if (filterParams.realised_date === '') return true;
        return expense.realised_date === filterParams.realised_date;
      });

      sortParams.amount === 'ascending' &&
        expenses.sort((firstExpense, secondExpense) => {
          if (firstExpense.amount > secondExpense.amount) return 1;
          if (firstExpense.amount < secondExpense.amount) return -1;
          return 0;
        });

      sortParams.amount === 'descending' &&
        expenses.sort((firstExpense, secondExpense) => {
          if (firstExpense.amount > secondExpense.amount) return -1;
          if (firstExpense.amount < secondExpense.amount) return 1;
          return 0;
        });

      sortParams.realised_date === 'ascending' &&
        expenses.sort((firstExpense, secondExpense) => {
          const firstExpenseRealisedDate = moment(firstExpense.realised_date);
          const secondExpenseRealisedDate = moment(secondExpense.realised_date);

          if (firstExpenseRealisedDate > secondExpenseRealisedDate) return 1;
          if (firstExpenseRealisedDate < secondExpenseRealisedDate) return -1;
          return 0;
        });

      sortParams.realised_date === 'descending' &&
        expenses.sort((firstExpense, secondExpense) => {
          const firstExpenseRealisedDate = moment(firstExpense.realised_date);
          const secondExpenseRealisedDate = moment(secondExpense.realised_date);

          if (firstExpenseRealisedDate > secondExpenseRealisedDate) return -1;
          if (firstExpenseRealisedDate < secondExpenseRealisedDate) return 1;
          return 0;
        });

      return expenses;
    },
  });

  const isEmpty = !Boolean(
    getAllExpensesQuery.data && getAllExpensesQuery.data.length,
  );
  const showRightElementOfHeader = !isEmpty;

  return (
    <Page title="Cashly - Wydatki">
      <MainLayout>
        <ExpensePageHeader showRightElement={showRightElementOfHeader} />
        <PageMain>
          <ExpenseListOptionsProvider provider={expenseListOptionsProvider}>
            <ExpenseList
              data={getAllExpensesQuery.data}
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
