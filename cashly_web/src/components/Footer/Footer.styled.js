import styled from 'styled-components'

export const StyledFooter = styled.footer`
    margin-top: auto;
    text-align: center;
    padding-bottom: 16px;
    color: ${({ theme }) => theme.colors.gray600};
    font-size: ${({ theme }) => theme.fontSizes.h6};
`
