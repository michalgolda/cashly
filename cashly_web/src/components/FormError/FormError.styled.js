import styled from 'styled-components'

export const StyledFormError = styled.p`
    color: white;
    padding: 6px 8px;
    text-align: center;
    border-radius: 2px;
    word-break: break-word;
    font-size: ${({ theme }) => theme.fontSizes.h6};
    background-color: ${({ theme }) => theme.colors.red400};
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
`
