import { Open_Sans } from '@next/font/google'
import { createGlobalStyle } from 'styled-components'

const font = Open_Sans({
    subsets: ['latin', 'latin-ext'],
    weight: ['700'],
})

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-size: 16px;
        background-color: #f8f8f8;
        font-family: ${({ theme }) => theme.fontFamily};
    }

    h2 {
        font-size: 1.25rem;
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: ${font.style.fontFamily};
        color: ${({ theme }) => theme.colors.primary400};
    }

    p {
        color: #858585;
        font-weight: 400;
        font-size: 0.875;
    }

    a {
        color: #2667FF;
        font-weight: 700;
    }

    ::-webkit-scrollbar {
         width: 8px;
    }

    ::-webkit-scrollbar-track {
        background-color: #fbfbfb;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 2px;
        background: ${({ theme }) => theme.colors.primary400}; 
    }

    // ::-webkit-scrollbar-thumb:hover {
    //     background: ${({ theme }) => theme.colors.primary500}; 
    // }

    // ::-webkit-scrollbar-thumb:focus {
    //     background: ${({ theme }) => theme.colors.primary300}; 
    // }
`

export default GlobalStyle
