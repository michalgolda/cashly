import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'

import { StyledCloseButton } from './CloseButton.styled'

function CloseButton({ variant, ...props }) {
    return (
        <StyledCloseButton variant={variant} {...props}>
            <FontAwesomeIcon icon={faTimes} />
        </StyledCloseButton>
    )
}

CloseButton.propTypes = {
    variant: PropTypes.oneOf(['light', 'dark']).isRequired,
}

export default CloseButton
