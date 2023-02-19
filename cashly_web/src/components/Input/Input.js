import PropTypes from 'prop-types'

import {
    StyledContainer,
    StyledError,
    StyledInput,
    StyledLabel,
} from './Input.styled'

function Input({ className, fullWidth, labelText, error, ...props }) {
    return (
        <StyledContainer fullWidth={fullWidth}>
            {labelText && (
                <StyledLabel className="inputLabel">{labelText}</StyledLabel>
            )}
            <StyledInput
                className={className}
                isError={Boolean(error)}
                labelText={Boolean(labelText)}
                {...props}
            />
            {error && <StyledError>{error}</StyledError>}
        </StyledContainer>
    )
}

Input.propTypes = {
    error: PropTypes.string,
    fullWidth: PropTypes.bool,
    labelText: PropTypes.string,
}

Input.defaultProps = { fullWidth: false }

export default Input
