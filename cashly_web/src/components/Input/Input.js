import PropTypes from 'prop-types'

import {
    StyledContainer,
    StyledInput,
    StyledLabelContainer,
    StyledLabelSeparator,
    StyledLabelText,
} from './Input.styled'

function Input({ className, fullWidth, labelText, error, ...props }) {
    return (
        <StyledContainer isError={Boolean(error)} fullWidth={fullWidth}>
            <StyledLabelContainer>
                <StyledLabelText className="labelText">
                    {labelText}
                </StyledLabelText>
                {error && (
                    <>
                        <StyledLabelSeparator className="labelSeparator" />
                        <StyledLabelText className="labelText">
                            {error}
                        </StyledLabelText>
                    </>
                )}
            </StyledLabelContainer>
            <StyledInput className={`${className} input`} {...props} />
        </StyledContainer>
    )
}

Input.propTypes = {
    error: PropTypes.string,
    fullWidth: PropTypes.bool,
    labelText: PropTypes.string.isRequired,
}

Input.defaultProps = { fullWidth: false }

export default Input
