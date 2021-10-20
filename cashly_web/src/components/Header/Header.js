import styled from "styled-components";

const StyledContainer = styled.div`
    width: 100%;
    height: auto;
    padding: 1rem 5rem 1rem 5rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
`;

const StyledTextLogo = styled.p`
    font-size: ${({ theme }) => theme.font.sizes.h3};
    font-weight: ${({ theme }) => theme.font.weights.bold};
`;

export default function Header() {
    return (
        <StyledContainer>
            <StyledTextLogo>Cashly</StyledTextLogo>
        </StyledContainer>
    );
}