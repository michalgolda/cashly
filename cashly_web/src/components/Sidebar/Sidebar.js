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
          <NavLinkIconButton to="/expenses" icon={faReceipt} />
        </S.MenuItem>
        <S.MenuItem>
          <NavLinkIconButton to="/categories" icon={faGripVertical} />
        </S.MenuItem>
        <S.MenuItem>
          <NavLinkIconButton to="/analytics" icon={faChartPie} />
        </S.MenuItem>
      </S.Menu>
      <S.Separator />
      <CurrentUserDetails user={user} logoutHandler={() => logout()} />
    </S.Nav>
  );
}
