import PropTypes from "prop-types";
import styled from "styled-components";
import CategoryListItem from "./CategoryListItem/CategoryListItem";
import CategoryListItemLoader from "./CategoryListItemLoader/CategoryListItemLoader";

const StyledList = styled.ul`
    display: grid;
    list-style: none;
    grid-row-gap: 1rem;
    grid-column-gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
`;

function CategoryList({ data, showLoader }) {
    return (
        <StyledList>
            {showLoader ? (
                <CategoryListItemLoader />
            ) : (
                data.map(({ id, name, color }, index) => (
                    <CategoryListItem 
                        id={id}
                        key={index}
                        name={name}
                        color={color}
                    />
                ))
            )}
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
    ),
    showLoader: PropTypes.bool.isRequired
};

export default CategoryList;