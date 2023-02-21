import { SessionProvider } from 'next-auth/react'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from 'styled-components'

import AppToastContainer from '@/components/AppToastContainer/AppToastContainer'
import { GlobalStyle, theme } from '@/styles'

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <>
            <SessionProvider session={session}>
                <ThemeProvider theme={theme}>
                    <QueryClientProvider client={queryClient}>
                        <GlobalStyle />
                        <Component {...pageProps} />
                        <AppToastContainer />
                    </QueryClientProvider>
                </ThemeProvider>
            </SessionProvider>
        </>
    )
}
