import PropTypes from "prop-types";
import styled from "styled-components";

import { Button } from "../../components";


const StyledButton = styled(Button)`
    padding: 10.42px;
    
    svg {
        width: ${({ theme }) => theme.fontSizes.h5} !important;
        height: ${({ theme }) => theme.fontSizes.h5} !important;
    }
`;

function IconButton(props) {
    const { icon } = props;
    
    return <StyledButton {...props}>{icon}</StyledButton>;
}

IconButton.propTypes = { icon: PropTypes.element.isRequired };

export default IconButton;