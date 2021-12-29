import styled from "styled-components";

import GeneralExpensesWidget from "../GeneralExpensesWidget/GeneralExpensesWidget";
import ExpensesByCategoryWidget from "../ExpensesByCategoryWidget/ExpensesByCategoryWidget";
import CountExpensesByCategoryWidget from "../CountExpensesByCategoryWidget/CountExpensesByCategoryWidget";


const StyledList = styled.div`
    display: grid;
    grid-row-gap: 32px;
    grid-template-rows: auto auto;
`;


export default function WidgetList() {
    return (
        <StyledList>
            <GeneralExpensesWidget />
            <ExpensesByCategoryWidget />
            <CountExpensesByCategoryWidget />
        </StyledList>
    );
}