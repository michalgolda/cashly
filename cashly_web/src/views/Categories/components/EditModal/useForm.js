import { useQueryClient } from 'react-query'

import { useUpdateExpenseCategoryMutation } from './useUpdateExpenseCategoryMutation'

export const useForm = (expenseCategoryId) => {
    const queryClient = useQueryClient()
    const mutation = useUpdateExpenseCategoryMutation()

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
            mutation.mutate({
                id: expenseCategoryId,
                ...values,
            })
        }
    }

    return { onSubmit }
}
