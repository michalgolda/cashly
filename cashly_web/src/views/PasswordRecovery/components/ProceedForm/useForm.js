import { useFormik } from 'formik'
import * as yup from 'yup'

import { usePasswordRecovery } from '../../usePasswordRecovery'
import { usePasswordProceedMutation } from './usePasswordRecoveryProceedMutation'

export const useForm = () => {
    const { passwordRecoveryToken } = usePasswordRecovery()
    const mutation = usePasswordProceedMutation()

    const initialValues = {
        password: '',
        confirmPassword: '',
    }

    const validationSchema = yup.object({
        password: yup.string().required('To pole jest wymagane'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Hasła nie są zgodne')
            .required('To pole jest wymagane'),
    })

    const onSubmit = ({ password }) =>
        mutation.mutate({
            password,
            passwordRecoveryToken,
        })

    return useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    })
}
