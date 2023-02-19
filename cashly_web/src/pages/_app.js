import { ThemeProvider } from 'styled-components'

import { GlobalStyle, theme } from '@/styles'

export default function App({ Component, pageProps }) {
    return (
        <>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    )
}
