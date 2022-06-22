import styled from "styled-components";

const StyledText = styled.p`text-align: center;`;

export default function AuthBottomText({ children }) {
    return <StyledText>{children}</StyledText>;
}