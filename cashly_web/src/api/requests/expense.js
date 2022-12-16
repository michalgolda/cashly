import apiClient from '@/api/client';

export const createExpense = ({ amount, realisedDate, expenseCategoryId }) =>
  apiClient.post('/expenses', {
    amount,
    realised_date: realisedDate,
    expense_category_id: expenseCategoryId,
  });

export const deleteExpense = ({ id }) => apiClient.delete(`/expenses/${id}`);

export const updateExpense = ({
  id,
  amount,
  realisedDate,
  expenseCategoryId,
}) =>
  apiClient.put(`/expenses/${id}`, {
    amount,
    realised_date: realisedDate,
    expense_category_id: expenseCategoryId,
  });

export const getAllExpenses = () =>
  apiClient.get('/expenses').then((res) => res.data);

export const importExpenses = ({ file }) => {
  const formData = new FormData();
  formData.append('file', file);

  return apiClient.post('/expenses/import', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const exportExpenses = ({ fileFormat }) =>
  apiClient.get(`/expenses/export?file_format=${fileFormat}`);
