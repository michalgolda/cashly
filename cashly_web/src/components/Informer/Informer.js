import PropTypes from 'prop-types'

import {
    StyledBottomElementWrapper,
    StyledContainer,
    StyledIllustrationWrapper,
    StyledText,
} from './Informer.styled'

function Informer({ text, bottomElement, illustration, ...props }) {
    return (
        <StyledContainer {...props}>
            <StyledIllustrationWrapper>
                {illustration}
            </StyledIllustrationWrapper>
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
