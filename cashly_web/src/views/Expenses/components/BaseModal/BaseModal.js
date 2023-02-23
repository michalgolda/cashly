import { useFormik } from 'formik'
import PropTypes from 'prop-types'
import { useQuery } from 'react-query'
import * as yup from 'yup'

import { expenseCategoryService } from '@/api/services'
import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'

import {
    StyledForm,
    StyledModal,
    StyledTextContainer,
} from './BaseModal.styled'

function BaseModal({
    title,
    onSubmit,
    submitText,
    description,
    initialValues,
    ...props
}) {
    initialValues.amount = Number(initialValues.amount).toFixed(2)

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

    const formik = useFormik({
        onSubmit,
        initialValues,
        validationSchema,
        enableReinitialize: true,
    })

    const getAllExpenseCategoriesQuery = useQuery(
        'categories',
        expenseCategoryService.getAllExpenseCategories
    )

    return (
        <StyledModal {...props}>
            <StyledTextContainer>
                <h2>{title}</h2>
                <p>{description}</p>
            </StyledTextContainer>
            <StyledForm onSubmit={formik.handleSubmit}>
                <Input
                    step="any"
                    type="number"
                    name="amount"
                    labelText="Kwota"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    error={formik.touched.amount && formik.errors.amount}
                    fullWidth
                />
                <Input
                    as="select"
                    labelText="Kategoria"
                    name="expenseCategoryId"
                    onChange={formik.handleChange}
                    value={formik.values.expenseCategoryId}
                    error={
                        formik.touched.expenseCategoryId &&
                        formik.errors.expenseCategoryId
                    }
                    fullWidth
                >
                    <option value="">Bez kategorii</option>
                    {getAllExpenseCategoriesQuery.data &&
                        getAllExpenseCategoriesQuery.data.map(
                            (category, index) => {
                                return (
                                    <option key={index} value={category.id}>
                                        {category.name}
                                    </option>
                                )
                            }
                        )}
                </Input>
                <Input
                    type="date"
                    name="realisedDate"
                    labelText="Data zrealizowania"
                    onChange={formik.handleChange}
                    value={formik.values.realisedDate}
                    error={
                        formik.touched.realisedDate &&
                        formik.errors.realisedDate
                    }
                    fullWidth
                />
                <Button type="submit" fullWidth>
                    {submitText}
                </Button>
            </StyledForm>
        </StyledModal>
    )
}

BaseModal.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    submitText: PropTypes.string.isRequired,
    initialValues: PropTypes.shape({
        amount: PropTypes.number.isRequired,
        expenseCategoryId: PropTypes.string,
        realisedDate: PropTypes.string.isRequired,
    }).isRequired,
}

export default BaseModal
