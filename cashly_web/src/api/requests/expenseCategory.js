import apiClient from "@/api/client";

export const createExpenseCategory = ({ name, color }) =>
  apiClient.post("/expense_categories", { name, color });

export const deleteExpenseCategory = ({ id }) =>
  apiClient.delete(`/expense_categories/${id}`);

export const updateExpenseCategory = ({ id, name, color }) =>
  apiClient.put(`/expense_categories/${id}`, { name, color });

export const getAllExpenseCategories = () =>
  apiClient.get("/expense_categories").then((res) => res.data);
