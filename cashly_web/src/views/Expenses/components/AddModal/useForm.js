import moment from 'moment'

import { useCreateExpenseMutation } from './useCreateExpenseMutation'

export const useForm = () => {
    const mutation = useCreateExpenseMutation()

    const onSubmit = (values, { resetForm }) => {
        resetForm()
        mutation.mutate(values)
    }

    const initialValues = {
        amount: 0,
        expenseCategoryId: undefined,
        realisedDate: moment().format('YYYY-MM-DD'),
    }

    return { onSubmit, initialValues }
}
