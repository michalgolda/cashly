import PropTypes from 'prop-types'

import { StyledContainer, StyledLetter } from './Avatar.styled'

function Avatar({ letter, ...props }) {
    return (
        <StyledContainer {...props}>
            <StyledLetter>{letter}</StyledLetter>
        </StyledContainer>
    )
}

Avatar.propTypes = {
    letter: PropTypes.string.isRequired,
}

export default Avatar
