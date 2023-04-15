import styled from 'styled-components'

import IconButton from '@/components/IconButton/IconButton'

export const StyledActionButton = styled(IconButton)`
    color: white;
    background-color: #ff4848;

    &:hover {
        background-color: #e60053;
    }
    &:active {
        background-color: #ff337d;
    }
`
