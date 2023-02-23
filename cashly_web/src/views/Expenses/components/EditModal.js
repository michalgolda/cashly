import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { expenseService } from '@/api/services'
import { notifyUnhandledError } from '@/utils/notifyUnhandledError'

import BaseModal from './BaseModal/BaseModal'

export default NiceModal.create(
    ({ id, amount, realisedDate, expenseCategoryId }) => {
        const modal = useModal()
        const queryClient = useQueryClient()

        const notifyEditExpenseSuccess = () =>
            toast.success('Wydatek został pomyślnie zaktualizowany')

        const updateExpenseMutation = useMutation(
            expenseService.updateExpense,
            {
                onSuccess: () => {
                    modal.hide()
                    queryClient.invalidateQueries('expenses')
                    notifyEditExpenseSuccess()
                },
                onError: () => notifyUnhandledError(),
            }
        )

        const initialValues = {
            amount,
            realisedDate,
            expenseCategoryId,
        }

        const onSubmit = (values) => {
            values.expenseCategoryId = values.expenseCategoryId
                ? values.expenseCategoryId
                : null
            updateExpenseMutation.mutate({ id, ...values })
        }

        return (
            <BaseModal
                show={modal.visible}
                onHide={() => modal.hide()}
                title="Edycja wydatku"
                description={`
                    Lorem ipsum dolor sit amet, 
                    consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt.
                `}
                onSubmit={onSubmit}
                submitText="Zapisz zmiany"
                initialValues={initialValues}
            />
        )
    }
)
