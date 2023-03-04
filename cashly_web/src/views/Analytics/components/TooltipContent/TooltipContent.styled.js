import styled from 'styled-components'

export const StyledTooltip = styled.div`
    padding: 16px;
    border-radius: 2px;
    background-color: #fff;
    border: 1px solid #f3f3f3;
`

export const StyledLabel = styled.p`
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
`

export const StyledValue = styled.p`
    color: #2667ff;
    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSizes.h5};
`
