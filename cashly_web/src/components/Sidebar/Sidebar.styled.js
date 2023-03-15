import Image from 'next/image'
import styled from 'styled-components'

import Button from '../Button/Button'
import IconButton from '../IconButton/IconButton'

export const StyledNav = styled.nav`
    width: 100%;
    height: 100vh;
    display: flex;
    max-width: fit-content;
    flex-direction: column;
    background-color: white;
    border-right: 1px solid #f3f3f3;

    @media (${({ theme }) => theme.mediaQueries.tablet}) {
        max-width: 256px;
    }

    @media (${({ theme }) => theme.mediaQueries.mobile}) {
        height: auto;
        max-width: 100%;
        border-bottom: 1px solid #f3f3f3;
    }
`

export const StyledLogo = styled(Image)`
    display: none;
    margin: 32px auto;

    @media (${({ theme }) => theme.mediaQueries.tablet}) {
        display: inherit;
    }

    @media (${({ theme }) => theme.mediaQueries.mobile}) {
        display: inherit;
    }
`

export const StyledAppIcon = styled(Image)`
    margin: 0 auto;
    margin-top: 32px;

    @media (${({ theme }) => theme.mediaQueries.tablet}) {
        display: none;
    }

    @media (${({ theme }) => theme.mediaQueries.mobile}) {
        display: none;
    }
`

export const StyledTextLogoutButton = styled(Button)`
    padding: 0;
    display: none;
    margin: 32px auto;

    &:hover {
        color: #292929;
        background-color: transparent !important;
    }

    &:active {
        color: #3f3f3f;
        background-color: transparent !important;
    }

    @media (${({ theme }) => theme.mediaQueries.tablet}) {
        display: inline-flex;
    }

    @media (${({ theme }) => theme.mediaQueries.mobile}) {
        display: inline-flex;
    }
`

export const StyledIconLogoutButton = styled(Button)`
    padding: 0;
    width: 40px;
    height: 40px;
    color: black;
    margin: 32px auto;
    display: inline-flex;
    background-color: transparent;

    &:hover {
        color: #292929;
        background-color: transparent !important;
    }

    &:active {
        color: #3f3f3f;
        background-color: transparent !important;
    }

    svg {
        width: 20px;
    }

    @media (${({ theme }) => theme.mediaQueries.tablet}) {
        display: none;
    }

    @media (${({ theme }) => theme.mediaQueries.mobile}) {
        display: none;
    }
`

export const StyledToggleMenuButton = styled(IconButton)`
    right: 32px;
    width: 50px;
    bottom: 64px;
    height: 50px;
    z-index: 998;
    display: none;
    position: fixed;
    background-color: #2667ff;

    &:hover {
        background-color: #3571ff;
    }

    &:active {
        background-color: #4e80f7;
    }

    @media (${({ theme }) => theme.mediaQueries.mobile}) {
        display: inline-flex;
    }
`

export const StyledContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;

    @media (${({ theme }) => theme.mediaQueries.mobile}) {
        display: ${({ isHidden }) => (isHidden ? 'none' : 'inherit')};
    }
`
