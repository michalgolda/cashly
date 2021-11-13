import PropTypes from "prop-types";
import styled from "styled-components";

import { List } from "../../../components";
import ExpenseListItem from "../ExpenseListItem/ExpenseListItem";
import ExpenseListSkeleton from "../ExpenseListSkeleton/ExpenseListSkeleton";
import ExpenseListEmptyInformer from "../ExpenseListEmptyInformer/ExpenseListEmptyInformer";


const StyledWrapper = styled.div`padding: 64px;`;

const StyledList = styled(List)`
    width: 100%;
    margin: 0 auto;
    max-width: 1024px;
`;

function ExpenseList({ data, isEmpty, isLoading }) {
    return (
        <StyledWrapper>
            {!isLoading && isEmpty ? <ExpenseListEmptyInformer /> : (
                <StyledList>
                    {isLoading ? <ExpenseListSkeleton /> : (
                        <>
                            {data.map((item, index) => {
                                const { 
                                    created_at: createdAt, 
                                    spend_category: category 
                                } = item;

                                return (
                                    <ExpenseListItem 
                                        {...item} 
                                        key={index}
                                        category={category}
                                        createdAt={createdAt} 
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

ExpenseList.propTypes = {
    data: PropTypes.array,
    isEmpty: PropTypes.bool,
    isLoading: PropTypes.bool
};

ExpenseList.defaultProps = {
    isEmpty: true,
    isLoading: false
};

export default ExpenseList;