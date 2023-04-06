import { useFormik } from 'formik'
import * as yup from 'yup'

import { notifyUnhandledError } from '@/utils/notifyUnhandledError'

import { usePasswordRecoveryRequestMutation } from './usePasswordRecoveryRequestMutation'

export const useForm = () => {
    const mutation = usePasswordRecoveryRequestMutation()

    const initialValues = { email: '' }

    const validationSchema = yup.object({
        email: yup
            .string()
            .email('Podaj prawidłowy email')
            .required('To pole jest wymagane'),
    })

    const onSubmit = (values, { setFieldError }) => {
        mutation.mutate(values, {
            onError() {
                if (err.response && err.response.status === 404) {
                    const { code } = err.response.data
                    switch (code) {
                        case 'UserNotFoundError':
                            setFieldError(
                                'email',
                                'Użytkownik o podanym adresie email nie istnieje'
                            )
                            break
                        default:
                            break
                    }
                } else {
                    notifyUnhandledError()
                }
            },
        })
    }

    return useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    })
}
