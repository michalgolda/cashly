import apiClient from "../client";

export const createExpense = async ({
  amount,
  realisedDate,
  expenseCategoryId,
}) =>
  apiClient.post("/expenses", {
    amount,
    realised_date: realisedDate,
    expense_category_id: expenseCategoryId,
  });

export const deleteExpense = async ({ id }) =>
  apiClient.delete(`/expenses/${id}`);

export const updateExpense = async ({
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

export const getAllExpenses = async () =>
  apiClient.get("/expenses").then((res) => res.data);

export const importExpenses = async ({ file }) => {
  const formData = new FormData();
  formData.append("file", file);

  return apiClient.post("/expenses/import", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const exportExpenses = async ({ fileFormat }) =>
  apiClient.get(`/expenses/export?file_format=${fileFormat}`);
