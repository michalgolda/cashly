import styled from 'styled-components'

import { StyledBaseButton } from '@/components/Button/Button.styled'

export const StyledIconButton = styled(StyledBaseButton)`
    width: 32px;
    padding: 10.42px !important;

    svg {
        width: ${({ theme }) => theme.fontSizes.h5} !important;
        height: ${({ theme }) => theme.fontSizes.h5} !important;
    }
`
