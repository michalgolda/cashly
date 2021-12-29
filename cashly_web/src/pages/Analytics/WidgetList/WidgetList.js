import styled from "styled-components";

import GeneralExpensesWidget from "../GeneralExpensesWidget/GeneralExpensesWidget";


const StyledList = styled.div`
    display: grid;
    grid-row-gap: 32px;
    grid-template-rows: auto auto;
`;


export default function WidgetList() {
    return (
        <StyledList>
            <GeneralExpensesWidget />
        </StyledList>
    );
}