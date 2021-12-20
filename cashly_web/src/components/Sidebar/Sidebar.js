import { useState } from "react";
import styled, { css } from "styled-components";
import { 
    faReceipt, 
    faChartPie,
    faAngleLeft, 
    faAngleRight, 
    faGripVertical 
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IconButton } from "../../components";
import NavLinkButton from "./NavLinkButton/NavLinkButton";
import NavLinkIconButton from "./NavLinkIconButton/NavLinkIconButton";


const StyledNav = styled.nav`
    height: 100vh;
    display: flex;
    padding: 32px;
    width: min-content;
    flex-direction: column;
    background-color: white;
    border-right: 2px solid ${({ theme }) => theme.colors.gray400};

    .sidebarCollapse { margin-left: 64px; }

    ${({ expand }) => expand && css`
        .sidebarExpand { display: none; }
    `}

    ${({ expand }) => !expand && css`
        .sidebarAppName { display: none; }
        .sidebarCollapse { display: none; }
        .sidebarFooter { display: none; }
    `}
`;

const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const StyledAppName = styled.h2`
    text-transform: uppercase;
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
    const [expand, setExpand] = useState(true);

    return (
        <StyledNav expand={expand}>
            <StyledHeader>
                <StyledAppName className="sidebarAppName">Cashly</StyledAppName>
                <IconButton 
                    variant="text" 
                    className="sidebarCollapse"
                    onClick={() => setExpand(false)}
                    icon={<FontAwesomeIcon icon={faAngleLeft} />} 
                />
                <IconButton 
                    variant="text" 
                    className="sidebarExpand"
                    onClick={() => setExpand(true)}
                    icon={<FontAwesomeIcon icon={faAngleRight} />} 
                />
            </StyledHeader>
            <StyledNavLinkList className="sidebarNavLinkList">
                {expand ? (
                    <>
                        <NavLinkButton to="/expenses">Wydatki</NavLinkButton>
                        <NavLinkButton to="/categories">Kategorie</NavLinkButton>
                        <NavLinkButton to="/analytics">Analityka</NavLinkButton>
                    </>
                ) : (
                    <>
                        <NavLinkIconButton 
                            to="/expenses" 
                            icon={<FontAwesomeIcon icon={faReceipt} />} 
                        />
                        <NavLinkIconButton 
                            to="/categories" 
                            icon={<FontAwesomeIcon icon={faGripVertical} />} 
                        />
                        <NavLinkIconButton 
                            to="/analytics" 
                            icon={<FontAwesomeIcon icon={faChartPie} />} 
                        />
                    </>
                )}
            </StyledNavLinkList>
            <StyledFooter className="sidebarFooter">
                <strong>© 2021 Cashly app</strong> <br />
                by Michał Gołda
            </StyledFooter>
        </StyledNav>
    );
}

