import PropTypes from "prop-types";
import styled from "styled-components";

import { List } from "../../../components";
import CategoryListItem from "../CategoryListItem/CategoryListItem";
import CategoryListSkeleton from "../CategoryListSkeleton/CategoryListSkeleton";
import CategoryListEmptyInformer from "../CategoryListEmptyInformer/CategoryListEmptyInformer";


const StyledWrapper = styled.div`padding: 64px;`;

const StyledList = styled(List)`
    width: 100%;
    margin: 0 auto;
    max-width: 1024px;
`;

function CategoryList({ data, isEmpty, isLoading }) {
    return (
        <StyledWrapper>
            {!isLoading && isEmpty ? <CategoryListEmptyInformer /> : (
                <StyledList>
                    {isLoading ? <CategoryListSkeleton /> : (
                        <>
                            {data.map((item, index) => {
                                return (
                                    <CategoryListItem 
                                        {...item}
                                        key={index}
                                    />
                                );
                            })}
                        </>
                    )}
                </StyledList>
            )}
        </StyledWrapper>
    );
}

CategoryList.propTypes = { 
    data: PropTypes.array,
    isEmpty: PropTypes.bool,
    isLoading: PropTypes.bool
};

CategoryList.defaultProps = {
    isEmpty: true,
    isLoading: false
};

export default CategoryList;