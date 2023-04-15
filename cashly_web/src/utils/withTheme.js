import { ThemeProvider } from 'styled-components'

import { theme } from '@/styles'

export const withTheme = (component) => (
    <ThemeProvider theme={theme}>{component}</ThemeProvider>
)
