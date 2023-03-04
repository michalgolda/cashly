import Image from 'next/image'
import styled from 'styled-components'

import Button from '../Button/Button'
import SessionDetails from '../Header/SessionDetails/SessionDetails'

export const StyledNav = styled.nav`
    width: 100%;
    height: 100vh;
    display: flex;
    max-width: fit-content;
    flex-direction: column;
    background-color: white;
    border-right: 1px solid #f3f3f3;

    .logo {
        display: none;
    }

    .appIcon {
        margin: 0 auto;
        display: inherit;
        margin-top: 32px;
    }

    .linkButtonWithText {
        display: none;
    }

    .linkButtonWithOnlyIcon {
        display: inline-flex;
    }

    .textLogoutButton {
        display: none;
    }

    .iconLogoutButton {
        width: 40px;
        height: 40px;
        color: black;
        background-color: transparent;

        svg {
            width: 20px;
        }
    }

    .iconLogoutButton {
        display: inline-flex;
    }

    @media (min-width: 768px) {
        max-width: 256px;

        .logo {
            display: inherit;
        }

        .appIcon {
            display: none;
        }

        .linkButtonWithText {
            display: inline-flex;
        }

        .linkButtonWithOnlyIcon {
            display: none;
        }

        .textLogoutButton {
            display: inline-flex;
        }

        .iconLogoutButton {
            display: none;
        }
    }
`

export const StyledLogoImage = styled(Image)`
    margin: 32px auto;
`

export const StyledMenu = styled.ul`
    flex: 1;
    display: flex;
    row-gap: 16px;
    list-style: none;
    text-align: center;
    flex-direction: column;
    padding: 32px 16px 32px 16px;
`

export const StyledMenuItem = styled.li``

export const StyledLogoutButton = styled(Button)`
    padding: 0;
    margin: 32px auto;

    &:hover {
        color: #292929;
        background-color: transparent !important;
    }

    &:active {
        color: #3f3f3f;
        background-color: transparent !important;
    }
`

export const StyledLogoutIconButton = styled(Button)`
    padding: 0;
    margin: 32px auto;

    &:hover {
        color: #292929;
        background-color: transparent !important;
    }

    &:active {
        color: #3f3f3f;
        background-color: transparent !important;
    }
`
