import { useFormik } from 'formik'
import PropTypes from 'prop-types'
import * as yup from 'yup'

import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'

import {
    StyledColorInput,
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
    const validationSchema = yup.object().shape({
        name: yup
            .string()
            .required('Nazwa kategorii jest wymagana.')
            .max(25, 'Nazwa kategorii może mieć maksymalnie 25 znaków.'),
    })

    const formik = useFormik({
        onSubmit,
        initialValues,
        validationSchema,
        enableReinitialize: true,
    })

    return (
        <StyledModal {...props}>
            <StyledTextContainer>
                <h2>{title}</h2>
                <p>{description}</p>
            </StyledTextContainer>
            <StyledForm onSubmit={formik.handleSubmit}>
                <Input
                    type="text"
                    name="name"
                    labelText="Nazwa"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && formik.errors.name}
                    fullWidth
                />
                <StyledColorInput
                    type="color"
                    name="color"
                    labelText="Kolor"
                    value={formik.values.color}
                    onChange={formik.handleChange}
                    error={formik.touched.color && formik.errors.color}
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
    onSubmit: PropTypes.func.isRequired,
    submitText: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    initialValues: PropTypes.shape({
        name: PropTypes.string,
        color: PropTypes.string,
    }).isRequired,
}

export default BaseModal
