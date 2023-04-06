import { useQueryClient } from 'react-query'

import { useCreateExpenseCategoryMutation } from './useCreateExpenseCategoryMutation'

export const useForm = () => {
    const mutation = useCreateExpenseCategoryMutation()
    const queryClient = useQueryClient()

    const initialValues = { name: '', color: '#29eaff' }

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
            mutation.mutate(values)
        }
    }

    return { onSubmit, initialValues }
}
