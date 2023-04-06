import PropTypes from 'prop-types'

import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'

import {
    StyledColorInput,
    StyledForm,
    StyledModal,
    StyledTextContainer,
} from './BaseModal.styled'
import { useForm } from './useForm'

function BaseModal({
    title,
    onSubmit,
    submitText,
    description,
    initialValues,
    ...props
}) {
    const form = useForm({ onSubmit, initialValues })

    return (
        <StyledModal {...props}>
            <StyledTextContainer>
                <h2>{title}</h2>
                <p>{description}</p>
            </StyledTextContainer>
            <StyledForm onSubmit={form.handleSubmit}>
                <Input
                    type="text"
                    name="name"
                    labelText="Nazwa"
                    value={form.values.name}
                    onChange={form.handleChange}
                    error={form.touched.name && form.errors.name}
                    fullWidth
                />
                <StyledColorInput
                    type="color"
                    name="color"
                    labelText="Kolor"
                    value={form.values.color}
                    onChange={form.handleChange}
                    error={form.touched.color && form.errors.color}
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
