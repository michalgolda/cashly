import styled from 'styled-components'

import FlexCenter from '@/components/FlexCenter'
import Footer from '@/components/Footer/Footer'
import Logo from '@/components/Logo/Logo'

export const StyledFlexCenter = styled(FlexCenter)`
    width: 100%;
    height: 100vh;
    padding: 16px;
    background-color: #fff;
`

export const StyledContainer = styled.div`
    width: 100%;
    display: flex;
    row-gap: 64px;
    max-width: 360px;
    flex-direction: column;
`

export const StyledLogo = styled(Logo)`
    margin: 0 auto;
`

export const StyledFooter = styled(Footer)`
    background-color: #fff;
`
