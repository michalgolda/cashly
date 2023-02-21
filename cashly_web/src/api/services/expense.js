import apiClient from '../client'

export const createExpense = (
    payload = { amount, realisedDate, expenseCategoryId }
) =>
    apiClient.post('/expenses', {
        amount: payload.amount,
        realised_date: payload.realisedDate,
        expense_category_id: payload.expenseCategoryId,
    })

export const deleteExpense = (payload = { id }) =>
    apiClient.delete(`/expenses/${payload.id}`)

export const updateExpense = (
    payload = {
        id,
        amount,
        realisedDate,
        expenseCategoryId,
    }
) =>
    apiClient.put(`/expenses/${payload.id}`, {
        amount: payload.amount,
        realised_date: payload.realisedDate,
        expense_category_id: payload.expenseCategoryId,
    })

export const getAllExpenses = () =>
    apiClient.get('/expenses').then((res) => res.data)

export const importExpenses = (payload = { file }) => {
    const formData = new FormData()
    formData.append('file', payload.file)

    return apiClient.post('/expenses/import', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    })
}

export const exportExpenses = (payload = { fileFormat }) =>
    apiClient.get(`/expenses/export?file_format=${payload.fileFormat}`)
