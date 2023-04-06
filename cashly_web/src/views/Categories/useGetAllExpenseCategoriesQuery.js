import { useQuery } from 'react-query'

import { expenseCategoryService } from '@/api/services'

export const useGetAllExpenseCategoriesQuery = () =>
    useQuery('categories', expenseCategoryService.getAllExpenseCategories)
