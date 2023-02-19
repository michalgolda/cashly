import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'

import { StyledIconButton } from './IconButton.styled'

function IconButton({ icon, ...props }) {
    return (
        <StyledIconButton {...props}>
            <FontAwesomeIcon icon={icon} />
        </StyledIconButton>
    )
}

IconButton.propTypes = {
    icon: PropTypes.object.isRequired,
}

export default IconButton
