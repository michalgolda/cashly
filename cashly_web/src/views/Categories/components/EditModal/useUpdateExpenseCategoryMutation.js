import { useModal } from '@ebay/nice-modal-react'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { expenseCategoryService } from '@/api/services'
import { notifyUnhandledError } from '@/utils/notifyUnhandledError'

import EditModal from './EditModal'

export const useUpdateExpenseCategoryMutation = () => {
    const modal = useModal(EditModal)
    const queryClient = useQueryClient()

    const notifySuccess = () =>
        toast.success('Kategoria została pomyślnie zaktualizowana')

    return useMutation(expenseCategoryService.updateExpenseCategory, {
        onSuccess: () => {
            modal.hide()
            notifySuccess()
            queryClient.invalidateQueries('categories')
        },
        onError: () => {
            notifyUnhandledError()
        },
    })
}
