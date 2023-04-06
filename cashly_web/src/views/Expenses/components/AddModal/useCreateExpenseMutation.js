import { useModal } from '@ebay/nice-modal-react'
import { useQueryClient } from 'react-query'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import { expenseService } from '@/api/services'

import AddModal from './AddModal'

export const useCreateExpenseMutation = () => {
    const modal = useModal(AddModal)
    const queryClient = useQueryClient()

    const notifySuccess = () => toast.success('Wydatek został pomyślnie dodany')

    return useMutation(expenseService.createExpense, {
        onSuccess() {
            modal.hide()
            queryClient.invalidateQueries('expenses')
            notifySuccess()
        },
        onError() {
            notifyUnhandledError()
        },
    })
}
