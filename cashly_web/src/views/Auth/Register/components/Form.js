import { useFormik } from 'formik'
import * as yup from 'yup'

import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'

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

    const onSubmit = (values) => console.log(values)

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    })

    return (
        <BaseForm onSubmit={formik.handleSubmit} noValidate>
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
