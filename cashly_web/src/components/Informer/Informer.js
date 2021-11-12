import PropTypes from "prop-types";
import styled from "styled-components";


const StyledContainer = styled.div`
    text-align: center;
    padding: 0 32px 0 32px;
`;

const StyledIllustration = styled.img`
    width: 100%;
    max-width: 256px;
`;

const StyledText = styled.p`
    margin-top: 16px;
    font-size: ${({ theme }) => theme.fontSizes.h3};
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
`;

const StyledBottomElementWrapper = styled.div`margin-top: 32px;`;

function Informer(props) {
    const { bottomElement, text, illustrationSource } = props;

    return (
        <StyledContainer {...props}>
            {illustrationSource && <StyledIllustration src={illustrationSource} />}
            <StyledText>{text}</StyledText>
            {bottomElement && (
                <StyledBottomElementWrapper>
                    {bottomElement}
                </StyledBottomElementWrapper>
            )}
        </StyledContainer>
    );
}

Informer.propTypes = {
    bottomElement: PropTypes.element,
    text: PropTypes.string.isRequired,
    illustrationSource: PropTypes.string
};

export default Informer;