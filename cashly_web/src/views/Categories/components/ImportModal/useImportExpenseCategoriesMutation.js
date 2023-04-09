import { useModal } from '@ebay/nice-modal-react'
import { useQueryClient } from 'react-query'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import { expenseCategoryService } from '@/api/services'
import { notifyUnhandledError } from '@/utils/notifyUnhandledError'

import ImportModal from './ImportModal'

export const useImportExpenseCategoriesMutation = () => {
    const modal = useModal(ImportModal)
    const queryClient = useQueryClient()

    const notifySuccess = () =>
        toast.success('Kategorie wydatków zostały pomyślnie zaimportowane')

    return useMutation(expenseCategoryService.importExpenseCategories, {
        onSuccess: () => {
            modal.hide()
            queryClient.invalidateQueries('categories')
            notifySuccess()
        },
        onError: () => {
            notifyUnhandledError()
        },
    })
}
