import { render } from "@testing-library/react";
import withTheme from "../../../utilities/withTheme";
import ExpenseListItem from "./ExpenseListItem";

test("renders ExpenseListItem component", () => {
    const fakeData = {
        id: "1",
        spend_category: {
            id: "1",
            name: "asdf",
            color: "#f00"
        },
        amount: 12.00,
        created_at: "12.10.2021"
    };
    
    const PreparedExpenseListItemComponent = () => {
        return (
            <ExpenseListItem 
                id={fakeData.id}
                amount={fakeData.amount}
                createdAt={fakeData.created_at}
                category={fakeData.spend_category}
            />
        );
    }
    
    const { container } = render(withTheme(PreparedExpenseListItemComponent));

    expect(container.firstChild).toMatchSnapshot();
})