import styled from 'styled-components'

import Logo from '@/components/Logo/Logo'

export const StyledContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    padding: 1rem;
    align-items: center;
    justify-content: center;
`

export const StyledWrapper = styled.div`
    width: 100%;
    min-width: 256px;
    max-width: 512px;
`

export const StyledLogo = styled(Logo)`
    font-size: 2.4rem;
    text-align: center;
    margin-bottom: 32px;
`
