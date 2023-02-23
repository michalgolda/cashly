import styled, { css } from 'styled-components'

export const StyledWidget = styled.div`
    border-radius: 2px;
    background-color: white;
    border: 1px solid ${({ theme }) => theme.colors.gray400};
`

export const StyledHeader = styled.div`
    padding: 15px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray400};
`

export const StyledTitle = styled.p`
    color: ${({ theme }) => theme.colors.gray600};
    font-size: ${({ theme }) => theme.fontSizes.h5};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
`

export const StyledBody = styled.div`
    padding: 15px;
    ${({ centerContent }) =>
        centerContent &&
        css`
            display: flex;
            justify-content: center;
        `}
`
