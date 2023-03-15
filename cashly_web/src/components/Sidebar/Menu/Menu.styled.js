import styled from 'styled-components'

export const StyledMenu = styled.ul`
    flex: 1;
    display: flex;
    row-gap: 16px;
    list-style: none;
    text-align: center;
    flex-direction: column;
    padding: 32px 16px 32px 16px;

    @media (${({ theme }) => theme.mediaQueries.mobile}) {
        flex: 0;
        padding-bottom: 64px;
    }
`

export const StyledMenuItem = styled.li``
