import apiClient from '../client'

export const createExpenseCategory = (payload = { name, color }) =>
    apiClient.post('/expense_categories', payload)

export const deleteExpenseCategory = (payload = { id }) =>
    apiClient.delete(`/expense_categories/${payload.id}`)

export const updateExpenseCategory = (payload = { id, name, color }) =>
    apiClient.put(`/expense_categories/${payload.id}`, {
        name: payload.name,
        color: payload.color,
    })

export const getAllExpenseCategories = () =>
    apiClient.get('/expense_categories').then((res) => res.data)
