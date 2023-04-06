import { useFormik } from 'formik'
import * as yup from 'yup'

export const useForm = ({ onSubmit, initialValues }) => {
    const validationSchema = yup.object().shape({
        name: yup
            .string()
            .required('Nazwa kategorii jest wymagana.')
            .max(25, 'Nazwa kategorii może mieć maksymalnie 25 znaków.'),
    })

    return useFormik({
        onSubmit,
        initialValues,
        validationSchema,
        enableReinitialize: true,
    })
}
