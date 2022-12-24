import apiClient from '@/api/client';

export const getGeneralExpenses = ({ startDate, endDate, unit }) =>
  apiClient
    .get('/analytics/general_expenses', {
      params: {
        unit,
        start_date: startDate,
        end_date: endDate,
      },
    })
    .then((res) => res.data);

export const getTotalAmountOfExpenses = ({ startDate, endDate }) =>
  apiClient
    .get('/analytics/total_amount_of_expenses', {
      params: {
        start_date: startDate,
        end_date: endDate,
      },
    })
    .then((res) => res.data);

export const getExpensesByCategory = ({ startDate, endDate, unit }) =>
  apiClient
    .get('/analytics/expenses_by_category', {
      params: {
        unit,
        start_date: startDate,
        end_date: endDate,
      },
    })
    .then((res) => res.data);

export const getCountExpensesByCategory = ({ startDate, endDate }) =>
  apiClient
    .get('/analytics/count_expenses_by_category', {
      params: {
        start_date: startDate,
        end_date: endDate,
      },
    })
    .then((res) => res.data);

export const getCountAllExpenses = ({ startDate, endDate }) =>
  apiClient
    .get('/analytics/count_all_expenses', {
      params: {
        start_date: startDate,
        end_date: endDate,
      },
    })
    .then((res) => res.data);

export const getCountAllExpenseCategories = ({ startDate, endDate }) =>
  apiClient
    .get('/analytics/count_all_expense_categories', {
      params: {
        start_date: startDate,
        end_date: endDate,
      },
    })
    .then((res) => res.data);
