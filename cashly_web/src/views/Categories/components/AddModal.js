import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { expenseCategoryService } from '@/api/services'
import { notifyUnhandledError } from '@/utils/notifyUnhandledError'

import BaseModal from './BaseModal/BaseModal'

export default NiceModal.create(() => {
    const modal = useModal()
    const queryClient = useQueryClient()

    const notifyAddCategorySuccess = () =>
        toast.success('Kategoria została pomyślnie dodana')

    const initialValues = { name: '', color: '#29eaff' }

    const createExpenseCategoryMutation = useMutation(
        expenseCategoryService.createExpenseCategory,
        {
            onSuccess: () => {
                modal.hide()
                queryClient.invalidateQueries('categories')
                notifyAddCategorySuccess()
            },
            onError: () => {
                modal.hide()
                notifyUnhandledError()
            },
        }
    )

    const onSubmit = (values, { resetForm, setSubmitting, setFieldError }) => {
        const categories = queryClient.getQueryData('categories')
        const categoryNameIsAlreadyUsed = categories.find(
            ({ name: categoryName }) => categoryName === values.name
        )

        if (categoryNameIsAlreadyUsed) {
            setSubmitting(false)
            setFieldError('name', 'Podana nazwa jest już w użyciu.')
        } else {
            resetForm()
            createExpenseCategoryMutation.mutate(values)
        }
    }

    return (
        <BaseModal
            show={modal.visible}
            onHide={() => modal.hide()}
            submitText="Utwórz"
            onSubmit={onSubmit}
            initialValues={initialValues}
            title="Stwórz nową kategorię"
            description={`
				Lorem ipsum dolor sit amet, 
				consectetur adipiscing elit, 
				sed do eiusmod tempor incididunt.
			`}
        />
    )
})
