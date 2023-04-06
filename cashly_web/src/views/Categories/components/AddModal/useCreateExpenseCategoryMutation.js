import { useModal } from '@ebay/nice-modal-react'
import { useQueryClient } from 'react-query'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import { expenseCategoryService } from '@/api/services'

import AddModal from './AddModal'

export const useCreateExpenseCategoryMutation = () => {
    const modal = useModal(AddModal)
    const queryClient = useQueryClient()

    const notifySuccess = () =>
        toast.success('Kategoria została pomyślnie dodana')

    return useMutation(expenseCategoryService.createExpenseCategory, {
        onSuccess() {
            modal.hide()
            queryClient.invalidateQueries('categories')
            notifySuccess()
        },
        onError() {
            modal.hide()
            notifyUnhandledError()
        },
    })
}
