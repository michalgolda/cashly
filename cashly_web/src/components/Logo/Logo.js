import styled from "styled-components";

const StyledText = styled.h2`
    text-transform: uppercase;
    font-weight: ${({ theme }) => theme.fontWeights.extraBold};
`;

export default function Logo(props) {
    return <StyledText {...props}>Cashly</StyledText>;
}