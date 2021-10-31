import PropTypes from "prop-types";
import styled from "styled-components";

const StyledListItem = styled.li`
    text-align: center;
    padding: .5rem 1rem .5rem 1rem;
    background-color: ${({ color }) => color};
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.font.sizes.h5};
    font-weight: ${({ theme }) => theme.font.weights.semiBold};
`;

function CategoryListItem({ id, name, color }) {
    return <StyledListItem color={color}>{name}</StyledListItem>;
}

CategoryListItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
};

export default CategoryListItem;