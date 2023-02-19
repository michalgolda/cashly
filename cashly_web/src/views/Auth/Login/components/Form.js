import { useFormik } from 'formik'
import * as yup from 'yup'

import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'

import BaseForm from '../../components/BaseForm/BaseForm'

export default function LoginForm() {
    const initialValues = {
        email: '',
        password: '',
    }

    const validationSchema = yup.object({
        email: yup
            .string()
            .email('Podaj prawidłowy email')
            .required('To pole jest wymagane'),
        password: yup.string().required('To pole jest wymagane'),
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => console.log(values),
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
            <Button type="submit" fullWidth>
                Zaloguj się
            </Button>
        </BaseForm>
    )
}
