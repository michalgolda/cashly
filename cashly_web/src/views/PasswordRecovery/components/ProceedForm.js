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

import { usePasswordRecovery } from '../hooks/usePasswordRecovery'

export default function ProceedForm() {
    const router = useRouter()
    const { passwordRecoveryToken } = usePasswordRecovery()

    const notifyPasswordRecoveryProceedSuccess = () =>
        toast.success('Hasło zostało pomyślnie zmienione')

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

    const passwordRecoveryProceedMutation = useMutation(
        authService.passwordRecoveryProceed,
        {
            onSuccess: () => {
                router.push('/login')
                notifyPasswordRecoveryProceedSuccess()
            },
            onError: () => notifyUnhandledError(),
        }
    )
    const onSubmit = ({ password }) =>
        passwordRecoveryProceedMutation.mutate({
            password,
            passwordRecoveryToken,
        })

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    })

    return (
        <BaseForm onSubmit={formik.handleSubmit} noValidate>
            <Input
                name="password"
                labelText="Nowe hasło"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                error={formik.touched.password && formik.errors.password}
                fullWidth
            />
            <Input
                name="confirmPassword"
                labelText="Powtórz hasło"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                error={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                }
                fullWidth
            />
            <Button type="submit">Zmień hasło</Button>
        </BaseForm>
    )
}
