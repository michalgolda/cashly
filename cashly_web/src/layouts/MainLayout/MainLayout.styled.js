import styled from 'styled-components'

export const StyledMain = styled.div`
    height: auto;
    display: flex;
    flex-direction: row;

    @media (${({ theme }) => theme.mediaQueries.mobile}) {
        flex-direction: column;
    }
`

export const StyledContent = styled.div`
    width: 100%;
    display: flex;
    overflow-y: auto;
    flex-direction: column;
    max-height: 100vh;

    @media (${({ theme }) => theme.mediaQueries.mobile}) {
        max-height: inherit;
    }
`
