import styled from 'styled-components'

import { StyledBox } from '../ListOptions.styled'

export const StyledContainer = styled(StyledBox)`
    display: grid;
    row-gap: 1rem;
    column-gap: 1rem;
    grid-template-columns: 1fr;
    border-bottom-left-radius: ${({ showOptionsSection }) =>
        showOptionsSection ? '0' : '2px'};
    border-bottom-right-radius: ${({ showOptionsSection }) =>
        showOptionsSection ? '0' : '2px'};

    @media (min-width: 768px) {
        display: flex;
        flex-direction: row;
        max-width: min-content;
    }
`
