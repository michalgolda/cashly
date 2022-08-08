import { useState } from "react";
import styled from "styled-components";
import {
  faReceipt,
  faChartPie,
  faAngleLeft,
  faAngleRight,
  faGripVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "@/hooks/auth";
import { IconButton, Logo } from "@/components";
import NavLinkButton from "./NavLinkButton/NavLinkButton";
import NavLinkIconButton from "./NavLinkIconButton/NavLinkIconButton";
import CurrentUserDetails from "./CurrentUserDetails/CurrentUserDetails";

const StyledNav = styled.nav`
  max-width: ${({ isExpanded }) => (isExpanded ? "256px" : "80px")};
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-right: 2px solid ${({ theme }) => theme.colors.gray400};
  transition-duration: 0.5s;

  .header {
    justify-content: ${({ isExpanded }) =>
      isExpanded ? "space-between" : "center"};
  }

  .appName {
    display: ${({ isExpanded }) => (isExpanded ? "inherit" : "none")};
  }

  .leftExpandBtn {
    display: ${({ isExpanded }) => (isExpanded ? "inherit" : "none")};
  }

  .rightExpandBtn {
    display: ${({ isExpanded }) => (isExpanded ? "none" : "inherit")};
  }

  .navLinkBtn {
    display: ${({ isExpanded }) => (isExpanded ? "flex" : "none")};
  }

  .navLinkIconBtn {
    display: ${({ isExpanded }) => (isExpanded ? "none" : "flex")};
  }

  .menu {
    align-items: ${({ isExpanded }) => (isExpanded ? "inherit" : "center")};
  }

  .currentUserDetails {
    row-gap: 16px;
    flex-direction: ${({ isExpanded }) => (isExpanded ? "row" : "column")};
  }

  .currentUserEmail {
    display: ${({ isExpanded }) => (isExpanded ? "unset" : "none")};
  }
`;

const StyledHeader = styled.div`
  display: flex;
  padding: 16px;
  justify-content: space-between;
`;

const StyledMenu = styled.ul`
  display: flex;
  flex: 1;
  flex-direction: column;
  row-gap: 8px;
  list-style: none;
  padding: 32px 16px 32px 16px;
`;

const StyledMenuItem = styled.li``;

const StyledSeparator = styled.span`
  height: 2px;
  width: 100%;
  display: block;
  background-color: ${({ theme }) => theme.colors.gray400};
`;

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const { user, logout } = useAuth();

  return (
    <StyledNav isExpanded={isExpanded}>
      <StyledHeader className="header">
        <Logo className="appName" />
        <IconButton
          onClick={() => setIsExpanded(false)}
          className="leftExpandBtn"
          variant="text"
          icon={faAngleLeft}
        />
        <IconButton
          onClick={() => setIsExpanded(true)}
          className="rightExpandBtn"
          variant="text"
          icon={faAngleRight}
        />
      </StyledHeader>
      <StyledSeparator />
      <StyledMenu className="menu">
        <StyledMenuItem>
          <NavLinkButton
            to="/expenses"
            className="navLinkBtn"
            startIcon={<FontAwesomeIcon icon={faReceipt} />}
          >
            Wydatki
          </NavLinkButton>
          <NavLinkIconButton
            to="/expenses"
            className="navLinkIconBtn"
            icon={faReceipt}
          />
        </StyledMenuItem>
        <StyledMenuItem>
          <NavLinkButton
            to="/categories"
            className="navLinkBtn"
            startIcon={<FontAwesomeIcon icon={faGripVertical} />}
          >
            Kategorie
          </NavLinkButton>
          <NavLinkIconButton
            to="/categories"
            className="navLinkIconBtn"
            icon={faGripVertical}
          />
        </StyledMenuItem>
        <StyledMenuItem>
          <NavLinkButton
            to="/analytics"
            className="navLinkBtn"
            startIcon={<FontAwesomeIcon icon={faChartPie} />}
          >
            Analityka
          </NavLinkButton>
          <NavLinkIconButton
            to="/analytics"
            className="navLinkIconBtn"
            icon={faChartPie}
          />
        </StyledMenuItem>
      </StyledMenu>
      <StyledSeparator />
      <CurrentUserDetails user={user} logoutHandler={() => logout()} />
    </StyledNav>
  );
}
