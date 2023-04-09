import { useModal } from '@ebay/nice-modal-react'
import { saveAs } from 'file-saver'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import { expenseCategoryService } from '@/api/services'
import { defaultDateTimeFormat } from '@/utils/defaultDateTimeFormat'
import { notifyUnhandledError } from '@/utils/notifyUnhandledError'

import ExportModal from './ExportModal'

export const useExportExpenseCategoriesMutation = () => {
    const modal = useModal(ExportModal)

    const notifySuccess = () =>
        toast.success('Kategorie wydatków zostały pomyślnie wyeksportowane')

    return useMutation(expenseCategoryService.exportExpenseCategories, {
        onSuccess: ({ data }) => {
            modal.hide()

            const blob = new Blob([data], { type: 'text/csv' })
            saveAs(
                blob,
                `Kategorie wydatków - ${defaultDateTimeFormat.format(
                    new Date()
                )}`
            )

            notifySuccess()
        },
        onError: () => {
            notifyUnhandledError()
        },
    })
}
