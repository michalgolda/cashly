import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-size: 16px;
        line-height: 1.6;
        font-family: ${({ theme }) => theme.fontFamily};
        color: ${({ theme }) => theme.colors.primary400};
        background-color: ${({ theme }) => theme.colors.gray200};
        font-weight: ${({ theme }) => theme.fontWeights.regular};
    }

    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-track {
        background-color: ${({ theme }) => theme.colors.gray400};
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 2px;
        background: ${({ theme }) => theme.colors.primary400}; 
    }

    ::-webkit-scrollbar-thumb:hover {
        background: ${({ theme }) => theme.colors.primary500}; 
    }

    ::-webkit-scrollbar-thumb:focus {
        background: ${({ theme }) => theme.colors.primary300}; 
    }
`;

export default GlobalStyle;
