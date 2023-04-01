import NiceModal, { bootstrapDialog, useModal } from '@ebay/nice-modal-react'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { expenseCategoryService } from '@/api/services'
import { notifyUnhandledError } from '@/utils/notifyUnhandledError'

import BaseModal from './BaseModal/BaseModal'

export default NiceModal.create(({ id, name, color }) => {
    const modal = useModal()
    const queryClient = useQueryClient()

    const initialValues = { name, color }

    const notifyUpdateExpenseSuccess = () =>
        toast.success('Kategoria została pomyślnie zaktualizowana')

    const updateExpenseCategoryMutation = useMutation(
        expenseCategoryService.updateExpenseCategory,
        {
            onSuccess: () => {
                modal.hide()
                notifyUpdateExpenseSuccess()
                queryClient.invalidateQueries('categories')
            },
            onError: () => notifyUnhandledError(),
        }
    )
    const onSubmit = (values, { setSubmitting, setFieldError }) => {
        const categories = queryClient.getQueryData('categories')
        const categoryNameIsAlreadyUsed = categories.find(
            ({ name: categoryName }) => {
                return categoryName === values.name && categoryName !== name
            }
        )

        if (categoryNameIsAlreadyUsed) {
            setSubmitting(false)
            setFieldError('name', 'Podana nazwa jest już w użyciu.')
        } else {
            updateExpenseCategoryMutation.mutate({
                id,
                ...values,
            })
        }
    }

    return (
        <BaseModal
            show={modal.visible}
            onHide={() => modal.hide()}
            onSubmit={onSubmit}
            title="Edytowanie kategorii"
            submitText="Zapisz zmiany"
            initialValues={initialValues}
            description={`
                Jeśli chcesz zmienić parametry kategorii, możesz to zrobić poprzez ponniższy formularz.
			`}
        />
    )
})
