import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'

import {
    StyledButton,
    StyledEndIconWrapper,
    StyledStartIconWrapper,
} from './Button.styled'

function Button({ children, startIcon, endIcon, ...props }) {
    return (
        <StyledButton {...props}>
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
        </StyledButton>
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
