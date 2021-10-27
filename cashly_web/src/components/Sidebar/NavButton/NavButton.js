import PropTypes from "prop-types";
import { NavLink, useRouteMatch } from "react-router-dom";

import { Button } from "../../../components";

function NavButton({ children, to }) {
    const routeMatch = useRouteMatch({ path: to });
    const buttonVariant = routeMatch ? "primary" : "primaryOutline";

    return (
        <NavLink to={to}>
            <Button
                size="small"
                variant={buttonVariant}
                fullWidth
            >
                {children}
            </Button>
        </NavLink>
    );
}

NavButton.propTypes = { 
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default NavButton;