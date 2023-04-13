import styled from 'styled-components'

import Logo from '@/components/Logo/Logo'

export const StyledWrapper = styled.div`
    width: 100%;
    height: 100vh;
    padding: 16px;
    display: flex;
    align-items: center;
    background-color: #fff;
    justify-content: center;
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
