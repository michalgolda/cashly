import { useModal } from '@ebay/nice-modal-react'
import { saveAs } from 'file-saver'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import { expenseService } from '@/api/services'
import { defaultDateTimeFormat } from '@/utils/defaultDateTimeFormat'
import { notifyUnhandledError } from '@/utils/notifyUnhandledError'

import ExportModal from './ExportModal'

export const useExportExpensesMutation = () => {
    const modal = useModal(ExportModal)

    const notifySuccess = () =>
        toast.success('Wydatki zostały pomyślnie wyeksportowane')

    return useMutation(expenseService.exportExpenses, {
        onSuccess: ({ data }) => {
            modal.hide()

            const blob = new Blob([data], { type: 'text/csv' })
            saveAs(
                blob,
                `Wydatki - ${defaultDateTimeFormat.format(new Date())}`
            )

            notifySuccess()
        },
        onError: () => {
            notifyUnhandledError()
        },
    })
}
