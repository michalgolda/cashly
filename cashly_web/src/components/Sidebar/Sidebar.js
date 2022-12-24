import {
  faChartPie,
  faGripVertical,
  faReceipt,
} from '@fortawesome/free-solid-svg-icons';

import AppIconSVG from '@/assets/appIcon.svg';
import { useSession } from '@/hooks/useSession';

import CurrentUserDetails from './CurrentUserDetails/CurrentUserDetails';
import NavLinkIconButton from './NavLinkIconButton/NavLinkIconButton';
import * as S from './Sidebar.styled';
import Tooltip from './Tooltip/Tooltip';

export default function Sidebar() {
  const { user, logout } = useSession();

  return (
    <S.Nav>
      <S.Header>
        <img src={AppIconSVG} width={40.03} height={40.3} />
      </S.Header>
      <S.Separator />
      <S.Menu>
        <S.MenuItem>
          <Tooltip text="Wydatki">
            <NavLinkIconButton text="Wydatki" to="/expenses" icon={faReceipt} />
          </Tooltip>
        </S.MenuItem>
        <S.MenuItem>
          <Tooltip text="Kategorie">
            <NavLinkIconButton to="/categories" icon={faGripVertical} />
          </Tooltip>
        </S.MenuItem>
        <S.MenuItem>
          <Tooltip text="Analityka">
            <NavLinkIconButton
              text="Analityka"
              to="/analytics"
              icon={faChartPie}
            />
          </Tooltip>
        </S.MenuItem>
      </S.Menu>
      <S.Separator />
      <CurrentUserDetails user={user} logoutHandler={() => logout()} />
    </S.Nav>
  );
}
