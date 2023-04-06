import { useFormik } from 'formik'
import * as yup from 'yup'

export const useForm = ({ onSubmit, initialValues }) => {
    const validationSchema = yup.object().shape({
        amount: yup
            .number()
            .required('Kwota jest wymagana.')
            .positive('Podaj prawidłową wartość.')
            .min(0.01, 'Minimalna wartość to 0.01')
            .max(99999.0, 'Maksymalna wartość to 99999.00'),
        realisedDate: yup
            .date()
            .required('Data zrealizowania wydatku jest wymagana.'),
    })

    return useFormik({
        onSubmit,
        initialValues,
        validationSchema,
        enableReinitialize: true,
    })
}
