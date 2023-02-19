import styled from 'styled-components'

import { IconButton } from '@/components'

export const StyledActionButton = styled(IconButton)`
    color: white;
    background-color: ${({ theme }) => theme.colors.blue400};

    &:hover {
        background-color: ${({ theme }) => theme.colors.blue500};
    }

    &:active {
        background-color: ${({ theme }) => theme.colors.blue300};
    }
`
