import NiceModal, { useModal } from '@ebay/nice-modal-react'
import moment from 'moment'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { expenseService } from '@/api/services'
import { notifyUnhandledError } from '@/utils/notifyUnhandledError'

import BaseModal from './BaseModal/BaseModal'

export default NiceModal.create(() => {
    const modal = useModal()
    const queryClient = useQueryClient()

    const defaultRealisedDate = moment().format('YYYY-MM-DD')

    const notifyAddExpenseSuccess = () =>
        toast.success('Wydatek został pomyślnie dodany')

    const initialValues = {
        amount: 0,
        expenseCategoryId: undefined,
        realisedDate: defaultRealisedDate,
    }

    const createExpenseMutation = useMutation(expenseService.createExpense, {
        onSuccess: () => {
            modal.hide()
            queryClient.invalidateQueries('expenses')
            notifyAddExpenseSuccess()
        },
        onError: () => notifyUnhandledError(),
    })

    const onSubmit = (values, { resetForm }) => {
        resetForm()
        createExpenseMutation.mutate(values)
    }

    return (
        <BaseModal
            show={modal.visible}
            onHide={() => modal.hide()}
            title="Dodawanie wydatku"
            description={`
                Jeśli chcesz dodać nowy wydatek, możesz to zrobić poprzez ponniższy formularz.
            `}
            onSubmit={onSubmit}
            submitText="Dodaj"
            initialValues={initialValues}
        />
    )
})
