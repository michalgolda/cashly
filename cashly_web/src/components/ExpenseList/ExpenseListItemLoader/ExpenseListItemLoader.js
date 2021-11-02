import styled from "styled-components";

const StyledExpenseListItem = styled.div`
    height: 76px;
    border-radius: 2px;
    background-color: ${({ theme }) => theme.colors.gray300};
`;

export default function ExpenseListItemLoader() {
    const elements = [];

    for (let i = 0; i < 3; i++)
        elements.push(<StyledExpenseListItem key={i} />);

    return elements;
}