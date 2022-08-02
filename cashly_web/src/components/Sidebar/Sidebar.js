import { useState } from "react";
import styled, { css } from "styled-components";
import {
  faReceipt,
  faChartPie,
  faAngleLeft,
  faAngleRight,
  faGripVertical,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAuth } from "@/hooks/auth";
import { IconButton, Logo, Avatar, Button, Skeleton } from "@/components";
import UserInfo from "./UserInfo/UserInfo";
import UserInfoSkeleton from "./UserInfoSkeleton/UserInfoSkeleton";
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

  .sidebarCollapse {
    margin-left: 64px;
  }

  ${({ expand }) =>
    expand &&
    css`
      .sidebarExpand {
        display: none;
      }
    `}

  ${({ expand }) =>
    !expand &&
    css`
      .sidebarAppName {
        display: none;
      }
      .sidebarCollapse {
        display: none;
      }
      .sidebarFooter {
        display: none;
      }
    `}
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledNavLinkList = styled.ul`
  display: grid;
  row-gap: 16px;
  margin-top: 32px;
  grid-auto-rows: auto;
`;

export default function Sidebar() {
  const [expand, setExpand] = useState(true);
  const { user, logout } = useAuth();

  return (
    <StyledNav expand={expand}>
      <StyledHeader>
        <Logo className="sidebarAppName">Cashly</Logo>
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
            {user ? <UserInfo email={user.email} /> : <UserInfoSkeleton />}
            <NavLinkButton to="/expenses">Wydatki</NavLinkButton>
            <NavLinkButton to="/categories">Kategorie</NavLinkButton>
            <NavLinkButton to="/analytics">Analityka</NavLinkButton>
            <Button onClick={() => logout()}>Wyloguj się</Button>
          </>
        ) : (
          <>
            {user ? (
              <Avatar email={user.email} />
            ) : (
              <Skeleton width={45} height={45} />
            )}
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
            <IconButton
              style={{ width: 40 }}
              onClick={() => logout()}
              icon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
            />
          </>
        )}
      </StyledNavLinkList>
    </StyledNav>
  );
}
