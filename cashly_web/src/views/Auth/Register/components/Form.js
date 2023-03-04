import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import * as yup from 'yup'

import { authService } from '@/api/services'
import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import { notifyUnhandledError } from '@/utils/notifyUnhandledError'

import BaseForm from '../../components/BaseForm/BaseForm'

export default function RegisterForm() {
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

    const router = useRouter()

    const notifyRegisterSuccess = () =>
        toast.success(
            'Konto zostało pomyślnie utworzone. Na podany adres email został wysłany link aktywacyjny'
        )

    const registerMutation = useMutation(
        (payload) => authService.register(payload),
        {
            onSuccess: () => {
                router.push('/login')
                notifyRegisterSuccess()
            },
            onError: ({ response }) => {
                if (response) {
                    const { code, message } = response.data
                    if (code === 'UserEmailAlreadyUsedError') {
                        toast.warning(message)
                        return
                    }
                }
                notifyUnhandledError()
            },
        }
    )

    const onSubmit = (values = { email, password }) =>
        registerMutation.mutate(values)

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    })

    return (
        <BaseForm onSubmit={formik.handleSubmit}>
            <Input
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.touched.email && formik.errors.email}
                labelText="E-Mail"
                fullWidth
            />
            <Input
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                error={formik.touched.password && formik.errors.password}
                labelText="Hasło"
                fullWidth
            />
            <Input
                name="confirmPassword"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                error={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                }
                labelText="Powtórz hasło"
                fullWidth
            />
            <Button type="submit" fullWidth>
                Zarejestruj się
            </Button>
        </BaseForm>
    )
}
