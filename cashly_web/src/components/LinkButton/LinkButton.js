import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Button } from "../../components";


const StyledLink = styled(Link)`text-decoration: none;`;

function LinkButton(props) {
    const { to, children } = props;

    return (
        <StyledLink to={to}>
            <Button {...props}>{children}</Button>
        </StyledLink>
    );
}

LinkButton.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default LinkButton;