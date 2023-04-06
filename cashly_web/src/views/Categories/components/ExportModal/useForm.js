import { useFormik } from 'formik'

import { useExportExpenseCategoriesMutation } from './useExportExpenseCategoriesMutation'

export const useForm = () => {
    const mutation = useExportExpenseCategoriesMutation()

    const onSubmit = (values) => mutation.mutate(values)

    const initialValues = { fileFormat: 'CSV' }

    return useFormik({
        onSubmit,
        initialValues,
    })
}
