import { useMatch } from 'react-router-dom';

import PropTypes from 'prop-types';

import * as S from './NavLinkButton.styled';

function NavLinkButton({ children, to, ...props }) {
  const isActive = useMatch({ path: to });

  return (
    <S.NavLink to={to}>
      <S.NavLinkButton variant="text" isActive={isActive} fullWidth {...props}>
        {children}
      </S.NavLinkButton>
    </S.NavLink>
  );
}

NavLinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default NavLinkButton;
