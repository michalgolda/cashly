import { useState } from "react";
import * as S from "./Sidebar.styles";
import {
  faReceipt,
  faChartPie,
  faAngleLeft,
  faAngleRight,
  faGripVertical,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/hooks/auth";
import { IconButton, Logo } from "@/components";
import NavLinkButton from "./NavLinkButton/NavLinkButton";
import NavLinkIconButton from "./NavLinkIconButton/NavLinkIconButton";
import CurrentUserDetails from "./CurrentUserDetails/CurrentUserDetails";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <S.Nav isExpanded={isExpanded}>
      <S.Header className="header">
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
      </S.Header>
      <S.Separator />
      <S.Menu className="menu">
        <S.MenuItem>
          <NavLinkButton
            to="/expenses"
            className="navLinkBtn"
            startIcon={faReceipt}
          >
            Wydatki
          </NavLinkButton>
          <NavLinkIconButton
            to="/expenses"
            className="navLinkIconBtn"
            icon={faReceipt}
          />
        </S.MenuItem>
        <S.MenuItem>
          <NavLinkButton
            to="/categories"
            className="navLinkBtn"
            startIcon={faGripVertical}
          >
            Kategorie
          </NavLinkButton>
          <NavLinkIconButton
            to="/categories"
            className="navLinkIconBtn"
            icon={faGripVertical}
          />
        </S.MenuItem>
        <S.MenuItem>
          <NavLinkButton
            to="/analytics"
            className="navLinkBtn"
            startIcon={faChartPie}
          >
            Analityka
          </NavLinkButton>
          <NavLinkIconButton
            to="/analytics"
            className="navLinkIconBtn"
            icon={faChartPie}
          />
        </S.MenuItem>
      </S.Menu>
      <S.Separator />
      <CurrentUserDetails user={user} logoutHandler={() => logout()} />
    </S.Nav>
  );
}
