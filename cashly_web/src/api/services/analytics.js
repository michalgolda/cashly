import apiClient from '../client'

export const getGeneralExpenses = (payload = { startDate, endDate, unit }) =>
    apiClient
        .get('/analytics/general_expenses', {
            params: {
                unit: payload.unit,
                start_date: payload.startDate,
                end_date: payload.endDate,
            },
        })
        .then((res) => res.data)

export const getTotalAmountOfExpenses = (payload = { startDate, endDate }) =>
    apiClient
        .get('/analytics/total_amount_of_expenses', {
            params: {
                start_date: payload.startDate,
                end_date: payload.endDate,
            },
        })
        .then((res) => res.data)

export const getExpensesByCategory = (payload = { startDate, endDate, unit }) =>
    apiClient
        .get('/analytics/expenses_by_category', {
            params: {
                unit: payload.unit,
                start_date: payload.startDate,
                end_date: payload.endDate,
            },
        })
        .then((res) => res.data)

export const getCountExpensesByCategory = (payload = { startDate, endDate }) =>
    apiClient
        .get('/analytics/count_expenses_by_category', {
            params: {
                start_date: payload.startDate,
                end_date: payload.endDate,
            },
        })
        .then((res) => res.data)

export const getCountAllExpenses = (payload = { startDate, endDate }) =>
    apiClient
        .get('/analytics/count_all_expenses', {
            params: {
                start_date: payload.startDate,
                end_date: payload.endDate,
            },
        })
        .then((res) => res.data)

export const getCountAllExpenseCategories = (
    payload = { startDate, endDate }
) =>
    apiClient
        .get('/analytics/count_all_expense_categories', {
            params: {
                start_date: payload.startDate,
                end_date: payload.endDate,
            },
        })
        .then((res) => res.data)
