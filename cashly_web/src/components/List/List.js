import PropTypes from "prop-types";
import styled from "styled-components";


const StyledList = styled.ul`
    width: 100%;
    display: grid;
    row-gap: 16px;
    list-style: none;
`;

function List(props) {
    const { children } = props;

    return <StyledList {...props}>{children}</StyledList>;
}

List.propTypes = { children: PropTypes.element };

export default List;