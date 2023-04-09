import { useModal } from '@ebay/nice-modal-react'
import { useQueryClient } from 'react-query'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import { expenseService } from '@/api/services'
import { notifyUnhandledError } from '@/utils/notifyUnhandledError'

import EditModal from './EditModal'

export const useUpdateExpenseMutation = () => {
    const modal = useModal(EditModal)
    const queryClient = useQueryClient()

    const notifySuccess = () =>
        toast.success('Wydatek został pomyślnie zaktualizowany')

    return useMutation(expenseService.updateExpense, {
        onSuccess: () => {
            modal.hide()
            queryClient.invalidateQueries('expenses')
            notifySuccess()
        },
        onError: () => {
            notifyUnhandledError()
        },
    })
}
