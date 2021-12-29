import styled from "styled-components";

import GeneralExpensesWidget from "../GeneralExpensesWidget/GeneralExpensesWidget";
import ExpensesByCategoryWidget from "../ExpensesByCategoryWidget/ExpensesByCategoryWidget";
import CountExpensesByCategoryWidget from "../CountExpensesByCategoryWidget/CountExpensesByCategoryWidget";
import TotalAmountOfExpensesWidget from "../TotalAmountOfExpensesWidget/TotalAmountOfExpensesWidget";

const StyledList = styled.div`
    display: grid;
    grid-row-gap: 32px;
    grid-template-rows: auto auto;
`;

const StyledGroup = styled.div`
    display: grid;
    grid-column-gap: 32px;
    grid-template-columns: ${({ columns }) => `repeat(${columns}, 1fr)`};
`;

export default function WidgetList() {
    return (
        <StyledList>
            <StyledGroup columns={1}>
                <TotalAmountOfExpensesWidget />
            </StyledGroup>
            <GeneralExpensesWidget />
            <ExpensesByCategoryWidget />
            <CountExpensesByCategoryWidget />
        </StyledList>
    );
}