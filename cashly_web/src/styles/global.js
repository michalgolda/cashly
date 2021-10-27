import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        color: ${({ theme }) => theme.colors.primary};
        font-family: ${({ theme }) => theme.font.family};
        background-color: ${({ theme }) => theme.colors.white};
        font-weight: ${({ theme }) => theme.font.weights.regular};
    }
`;

export default GlobalStyle;