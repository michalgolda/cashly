import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'styled-components'

import AppToastContainer from '@/components/AppToastContainer/AppToastContainer'
import { GlobalStyle, theme } from '@/styles'

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}) {

    return (
        <>
            <SessionProvider session={session}>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Component {...pageProps} />
                        <AppToastContainer />
            </ThemeProvider>
            </SessionProvider>
        </>
    )
}
