import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button } from "../../components";

function LinkButton(props) {
    const { to, children } = props;

    return (
        <Link to={to}>
            <Button {...props}>{children}</Button>
        </Link>
    );
}

LinkButton.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default LinkButton;