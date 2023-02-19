import PropTypes from 'prop-types'

import {
    StyledBottomElementWrapper,
    StyledContainer,
    StyledIllustration,
    StyledText,
} from './Informer.styled'

function Informer({
    text,
    bottomElement,
    illustrationSource,
    illustrationStyles,
    ...props
}) {
    return (
        <StyledContainer {...props}>
            {illustrationSource && (
                <StyledIllustration
                    src={illustrationSource}
                    style={illustrationStyles}
                />
            )}
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
    illustrationSource: PropTypes.string,
    illustrationStyles: PropTypes.object,
}

export default Informer
