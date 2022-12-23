import { useContext } from 'react';

import { ExpenseListOptionsContext } from './ExpenseListOptionsContext';

export const useExpenseListOptions = () =>
  useContext(ExpenseListOptionsContext);
