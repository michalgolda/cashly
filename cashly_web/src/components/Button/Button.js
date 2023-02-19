import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'

import {
    StyledEndIconWrapper,
    StyledPrimaryButton,
    StyledPrimaryOutlinedButton,
    StyledStartIconWrapper,
    StyledTextButton,
} from './Button.styled'

function Button({ children, variant, startIcon, endIcon, ...props }) {
    const ButtonVariant = {
        text: StyledTextButton,
        primary: StyledPrimaryButton,
        primaryOutlined: StyledPrimaryOutlinedButton,
    }[variant]

    return (
        <ButtonVariant {...props}>
            {startIcon && (
                <StyledStartIconWrapper>
                    <FontAwesomeIcon icon={startIcon} />
                </StyledStartIconWrapper>
            )}
            {children}
            {endIcon && (
                <StyledEndIconWrapper>
                    <FontAwesomeIcon icon={endIcon} />
                </StyledEndIconWrapper>
            )}
        </ButtonVariant>
    )
}

Button.propTypes = {
    children: PropTypes.node,
    variant: PropTypes.string,
    startIcon: PropTypes.object,
    endIcon: PropTypes.object,
}

Button.defaultProps = {
    fullWidth: false,
    variant: 'primary',
}

export default Button
