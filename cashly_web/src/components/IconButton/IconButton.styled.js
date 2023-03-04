import styled from 'styled-components'

import Button from '@/components/Button/Button'

export const StyledIconButton = styled(Button)`
    width: 32px;
    padding: 10.42px !important;

    svg {
        width: ${({ theme }) => theme.fontSizes.h5} !important;
        height: ${({ theme }) => theme.fontSizes.h5} !important;
    }
`
