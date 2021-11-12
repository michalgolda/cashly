import PropTypes from "prop-types";
import styled from "styled-components";


const StyledListItem = styled.li`
    padding: 15px;
    border-radius: 2px;
    background-color: white;
    border: 1px solid ${({ theme }) => theme.colors.gray400};
`;

function ListItem({ className, children }) {
    return <StyledListItem className={className}>{children}</StyledListItem>;
}

ListItem.propTypes = { children: PropTypes.node };

export default ListItem;