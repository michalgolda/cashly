import styled from 'styled-components'

import { StyledBox } from '../ListOptions.styled'

export const StyledContainer = styled(StyledBox)`
    display: grid;
    row-gap: 1rem;
    column-gap: 1rem;
    align-items: end;
    border-top-left-radius: 0;

    @media (min-width: 768px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
`
