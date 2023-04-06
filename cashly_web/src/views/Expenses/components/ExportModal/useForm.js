import { useFormik } from 'formik'

import { useExportExpensesMutation } from './useExportExpensesMutation'

export const useForm = () => {
    const mutation = useExportExpensesMutation()

    const onSubmit = (values) => mutation.mutate(values)

    const initialValues = { fileFormat: 'CSV' }

    return useFormik({
        onSubmit,
        initialValues,
    })
}
