import styled from 'styled-components'

import Button from '@/components/Button/Button'

export const StyledIconButton = styled(Button)`
    padding: 10.42px;

    svg {
        width: ${({ theme }) => theme.fontSizes.h5} !important;
        height: ${({ theme }) => theme.fontSizes.h5} !important;
    }
`
