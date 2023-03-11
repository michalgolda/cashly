import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import styled, { css } from 'styled-components'

export const StyledLink = styled(Link)`
    text-decoration: none;
`

export const StyledLinkButton = styled.button`
    color: black;
    border: none;
    cursor: pointer;
    height: 40px;
    width: 40px;
    text-align: left;
    font-weight: bold;
    font-size: 0.938rem;
    align-items: center;
    display: inline-flex;
    transition: all 0.25s;
    justify-content: center;
    background-color: white;
    font-family: ${({ theme }) => theme.fontFamily};
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};

    @media (min-width: 768px) {
        width: 100%;
        padding: 8px;
        height: auto;
        column-gap: 16px;
        justify-content: left;
    }

    &:hover {
        background-color: #f7f7f7;
    }

    &:active {
        background-color: #efefef;
    }

    ${({ isActive }) =>
        isActive &&
        css`
            color: white;
            background-color: ${({ theme }) => theme.colors.primary400};

            &:hover {
                background-color: #292929;
            }

            &:active {
                background-color: #3f3f3f;
            }
        `}
`

export const StyledIcon = styled(FontAwesomeIcon)`
    height: 20px;
`
