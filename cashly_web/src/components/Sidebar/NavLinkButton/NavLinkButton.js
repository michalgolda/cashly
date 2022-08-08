import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { NavLink, useMatch } from "react-router-dom";

import { Button } from "../../../components";

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;

const StyledNavLinkButton = styled(Button)`
  justify-content: left;
  color: ${({ theme }) => theme.colors.gray600};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};

  ${({ isActive }) =>
    isActive &&
    css`
      color: ${({ theme }) => theme.colors.primary400};
      background-color: ${({ theme }) => theme.colors.gray300};

      &:hover {
        background-color: ${({ theme }) => theme.colors.gray300};
      }
      &:active {
        background-color: ${({ theme }) => theme.colors.gray300};
      }
    `}
`;

function NavLinkButton({ children, to, ...props }) {
  const isActive = useMatch({ path: to });

  return (
    <StyledNavLink to={to}>
      <StyledNavLinkButton
        variant="text"
        isActive={isActive}
        fullWidth
        {...props}
      >
        {children}
      </StyledNavLinkButton>
    </StyledNavLink>
  );
}

NavLinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default NavLinkButton;
