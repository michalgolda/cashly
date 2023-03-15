import styled from 'styled-components'

export const StyledList = styled.div`
    display: grid;
    grid-row-gap: 32px;
    grid-template-rows: auto auto;
`

export const StyledGroup = styled.div`
    display: grid;
    row-gap: 32px;
    grid-column-gap: 32px;
    grid-template-columns: 1fr 1fr;

    @media (${({ theme }) => theme.mediaQueries.tablet}) {
        grid-template-columns: 1fr 1fr 1fr;
    }

    @media (${({ theme }) => theme.mediaQueries.mobile}) {
        grid-template-columns: 1fr;
    }
`
