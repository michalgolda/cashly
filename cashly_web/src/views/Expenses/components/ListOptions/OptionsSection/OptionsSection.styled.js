import styled from 'styled-components'

import { StyledBox } from '../ListOptions.styled'

export const StyledContainer = styled(StyledBox)`
    display: grid;
    row-gap: 1rem;
    column-gap: 1rem;
    align-items: end;
    border-top-left-radius: 0;

    @media (${({ theme }) => theme.mediaQueries.tablet}) {
        grid-template-columns: 1fr 1fr;
    }

    @media (${({ theme }) => theme.mediaQueries.desktop}) {
        grid-template-columns: 1fr 1fr 1fr;
    }
`
