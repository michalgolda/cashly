import PropTypes from "prop-types";
import styled from "styled-components";
import CategoryListItem from "./CategoryListItem/CategoryListItem";

const StyledList = styled.ul`
    display: grid;
    list-style: none;
    grid-row-gap: 1rem;
    grid-column-gap: 1rem;
    grid-template-columns: repeat(auto-fill, 10rem);
`;

function CategoryList({ data }) {
    return (
        <StyledList>
            {data.map(({ id, name, color }, index) => (
                <CategoryListItem 
                    id={id}
                    key={index}
                    name={name}
                    color={color}
                />
            ))}
        </StyledList>
    );
}

CategoryList.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            color: PropTypes.string
        })
    )
};

export default CategoryList;