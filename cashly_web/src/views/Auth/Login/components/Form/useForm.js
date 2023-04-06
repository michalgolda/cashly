import { useFormik } from 'formik'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import * as yup from 'yup'

export const useForm = () => {
    const router = useRouter()

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

    const onSubmit = (values = { email, password }) =>
        signIn('credentials', {
            ...values,
            redirect: false,
        }).then(({ ok, error }) => {
            !ok && toast.warning(error)
            ok && router.push('/expenses')
        })

    return useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    })
}
