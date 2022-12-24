import { useMatch } from 'react-router-dom';

import PropTypes from 'prop-types';

import * as S from './NavLinkIconButton.styled';

function NavLinkIconButton({ to, ...props }) {
  const isActive = useMatch({ path: to });

  return (
    <>
      <S.NavLink to={to}>
        <S.NavLinkButton variant="text" isActive={isActive} {...props} />
      </S.NavLink>
    </>
  );
}

NavLinkIconButton.propTypes = { to: PropTypes.string.isRequired };

export default NavLinkIconButton;
