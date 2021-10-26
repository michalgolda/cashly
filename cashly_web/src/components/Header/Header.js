import styled from "styled-components";

const StyledContainer = styled.div`
    width: 100%;
    height: auto;
    text-align: center;
    padding: 1rem 2rem 1rem 2rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray500};
`;

const StyledText = styled.p`
    font-size: ${({ theme }) => theme.font.sizes.h2};
    font-weight: ${({ theme }) => theme.font.weights.bold};
`;

export default function Header() {
    return (
        <StyledContainer>
            <StyledText>Cashly</StyledText>
        </StyledContainer>
    );
}