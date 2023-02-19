import PropTypes from 'prop-types'

import {
    StyledBottomElementWrapper,
    StyledContainer,
    StyledText,
} from './Informer.styled'

function Informer({ text, bottomElement, illustration, ...props }) {
    return (
        <StyledContainer {...props}>
            {illustration}
            <StyledText>{text}</StyledText>
            {bottomElement && (
                <StyledBottomElementWrapper>
                    {bottomElement}
                </StyledBottomElementWrapper>
            )}
        </StyledContainer>
    )
}

Informer.propTypes = {
    bottomElement: PropTypes.element,
    text: PropTypes.string.isRequired,
    illustration: PropTypes.element.isRequired,
}

export default Informer
