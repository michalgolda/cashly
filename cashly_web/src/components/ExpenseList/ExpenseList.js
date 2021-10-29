import PropTypes from "prop-types";
import styled from "styled-components";
import ExpenseListItem from "./ExpenseListItem/ExpenseListItem";

const StyledList = styled.ul`
    display: grid;
    list-style: none;
    grid-row-gap: 1rem;
    grid-auto-rows: auto;
`;

function ExpenseList({ data }) {
    return (
        <StyledList>
            {data.map(({ id, amount, spend_category, created_at }, index) => (
                <ExpenseListItem
                    id={id}
                    key={index}
                    amount={amount}
                    createdAt={created_at}
                    category={spend_category}
                />
            ))}
        </StyledList>
    );
}

ExpenseList.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            amount: PropTypes.number,
            spend_category: PropTypes.shape({
                id: PropTypes.string,
                name: PropTypes.string,
                color: PropTypes.string
            }),
            created_at: PropTypes.string
        })
    )
};

export default ExpenseList;