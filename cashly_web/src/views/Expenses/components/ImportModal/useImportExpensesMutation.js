import { useModal } from '@ebay/nice-modal-react'
import { useQueryClient } from 'react-query'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import { expenseService } from '@/api/services'

import ImportModal from './ImportModal'

export const useImportExpenseMutation = () => {
    const modal = useModal(ImportModal)
    const queryClient = useQueryClient()

    const notifySuccess = () =>
        toast.success('Wydatki zostały pomyślnie zaimportowane')

    return useMutation(expenseService.importExpenses, {
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
