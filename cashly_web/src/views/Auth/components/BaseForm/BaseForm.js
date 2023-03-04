import PropTypes from 'prop-types'

import FormError from '@/components/FormError/FormError'

import { StyledForm } from './BaseForm.styled'

function BaseForm({ children, nonFieldError, ...props }) {
    return (
        <StyledForm {...props} autoComplete="off" noValidate>
            {nonFieldError && <FormError>{nonFieldError}</FormError>}
            {children}
        </StyledForm>
    )
}

BaseForm.propTypes = {
    nonFieldError: PropTypes.string,
}

export default BaseForm
