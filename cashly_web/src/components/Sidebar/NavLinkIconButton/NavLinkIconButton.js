import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { NavLink, useRouteMatch } from "react-router-dom";

import IconButton from "../../IconButton/IconButton";


const StyledNavLink = styled(NavLink)`text-decoration: none;`;

const StyledNavLinkIconButton = styled(IconButton)`
    color: ${({ theme }) => theme.colors.gray600};
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};

    ${({ isActive }) => isActive && css`
        color: ${({ theme }) => theme.colors.primary400};
        background-color: ${({ theme }) => theme.colors.gray300};

        &:hover { background-color: ${({ theme }) => theme.colors.gray300}; }
        &:active { background-color: ${({ theme }) => theme.colors.gray300}; }
    `}
`;

function NavLinkIconButton(props) {
    const { to } = props;

    const isActive = useRouteMatch({ path: to });

    return (
        <StyledNavLink to={to}>
            <StyledNavLinkIconButton
                variant="text"
                isActive={isActive}
                {...props}
            />
        </StyledNavLink>
    );
}

NavLinkIconButton.propTypes = { to: PropTypes.string.isRequired };

export default NavLinkIconButton;