import styled from "styled-components";

import NavLinkButton from "./NavLinkButton/NavLinkButton";


const StyledNav = styled.nav`
    width: 256px;
    height: 100vh;
    padding: 32px;
    display: flex;
    position: fixed;
    flex-direction: column;
    background-color: white;
    border-right: 2px solid ${({ theme }) => theme.colors.gray400};
`;

const StyledAppName = styled.h2`
    font-weight: ${({ theme }) => theme.fontWeights.extraBold};
`;

const StyledNavLinkList = styled.ul`
    display: grid;
    row-gap: 16px;
    margin-top: 32px;
    grid-auto-rows: auto;
`;

const StyledFooter = styled.footer`
    margin-top: auto;
    color: ${({ theme }) => theme.colors.gray600};
    font-size: ${({ theme }) => theme.fontSizes.h6};
`;

export default function Sidebar() {
    return (
        <StyledNav>
            <StyledAppName>Cashly</StyledAppName>
            <StyledNavLinkList>
                <NavLinkButton to="/expenses">Wydatki</NavLinkButton>
                <NavLinkButton to="/categories">Kategorie</NavLinkButton>
            </StyledNavLinkList>
            <StyledFooter>
                <strong>© 2021 Cashly app</strong> <br />
                by Michał Gołda
            </StyledFooter>
        </StyledNav>
    );
}

