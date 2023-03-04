import styled from 'styled-components'

import IconButton from '@/components/IconButton/IconButton'

export const StyledActionButton = styled(IconButton)`
    color: white;
    background-color: #2667ff;

    &:hover {
        background-color: #3571ff;
    }

    &:active {
        background-color: #4e80f7;
    }
`
