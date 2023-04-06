import { useFormik } from 'formik'
import * as yup from 'yup'

import { useRegisterMutation } from './useRegisterMutation'

export const useForm = () => {
    const mutation = useRegisterMutation()

    const initialValues = {
        email: '',
        password: '',
        confirmPassword: '',
    }

    const validationSchema = yup.object({
        email: yup
            .string()
            .email('Podaj prawidłowy email')
            .required('To pole jest wymagane'),
        password: yup.string().required('To pole jest wymagane'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Hasła nie są zgodne')
            .required('To pole jest wymagane'),
    })

    const onSubmit = (values) => mutation.mutate(values)

    return useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    })
}
