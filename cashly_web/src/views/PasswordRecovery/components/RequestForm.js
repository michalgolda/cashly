import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import * as yup from 'yup'

import { authService } from '@/api/services'
import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import { notifyUnhandledError } from '@/utils/notifyUnhandledError'
import BaseForm from '@/views/Auth/components/BaseForm/BaseForm'

export default function RequestForm() {
    const router = useRouter()

    const notifyPasswordRecoveryRequestSuccess = () =>
        toast.success('Link do resetowania hasła został pomyślnie wysłany')

    const initialValues = { email: '' }
    const validationSchema = yup.object({
        email: yup
            .string()
            .email('Podaj prawidłowy email')
            .required('To pole jest wymagane'),
    })
    const passwordRecoveryRequestMutation = useMutation(
        authService.passwordRecoveryRequest,
        {
            onSuccess: () => {
                router.push('/login')
                notifyPasswordRecoveryRequestSuccess()
            },
        }
    )
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values, { setFieldError }) => {
            passwordRecoveryRequestMutation.mutate(values, {
                onError: (err) => {
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
        },
    })

    return (
        <BaseForm onSubmit={formik.handleSubmit} noValidate>
            <Input
                type="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.touched.email && formik.errors.email}
                labelText="E-Mail"
                fullWidth
            />
            <Button type="submit">Wyślij link</Button>
        </BaseForm>
    )
}
