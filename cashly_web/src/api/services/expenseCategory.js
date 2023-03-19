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

export const importExpenseCategories = (payload = { file }) => {
    const formData = new FormData()
    formData.append('file', payload.file)

    return apiClient.post('/expense_categories/import', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    })
}

export const exportExpenseCategories = (payload = { fileFormat }) =>
    apiClient.get(
        `/expense_categories/export?file_format=${payload.fileFormat}`
    )
