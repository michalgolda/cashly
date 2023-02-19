import Link from 'next/link'
import styled, { css } from 'styled-components'

import IconButton from '@/components/IconButton/IconButton'

export const StyledLink = styled(Link)`
    text-decoration: none;
`

export const StyledLinkButton = styled(IconButton)`
    color: ${({ theme }) => theme.colors.gray600};
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};

    ${({ isActive }) =>
        isActive &&
        css`
            color: ${({ theme }) => theme.colors.primary400};
            background-color: ${({ theme }) => theme.colors.gray300};

            &:hover {
                background-color: ${({ theme }) => theme.colors.gray300};
            }
            &:active {
                background-color: ${({ theme }) => theme.colors.gray300};
            }
        `}
`
