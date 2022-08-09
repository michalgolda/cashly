import styled, { css } from "styled-components";
import { NavLink as ReactRouterNavLink } from "react-router-dom";
import { IconButton } from "@/components";

const NavLink = styled(ReactRouterNavLink)`
  text-decoration: none;
`;

const NavLinkButton = styled(IconButton)`
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

export { NavLink, NavLinkButton };
