import { render } from "@testing-library/react";
import withTheme from "../../utilities/withTheme";
import ExpenseList from "./ExpenseList";

test("renders ExpenseList component", () => {
    const fakeData = [
        {
            id: "1",
            spend_category: {
                id: "1",
                name: "asdf",
                color: "#f00"
            },
            amount: 12.00,
            created_at: "12.10.2021"
        },
        {
            id: "2",
            spend_category: {
                id: "2",
                name: "abcd",
                color: "#f00"
            },
            amount: 3.23,
            created_at: "09.12.2023"
        }
    ];

    const PreparedExpenseListComponent = () => {
        return <ExpenseList data={fakeData} />
    }

    const { container } = render(withTheme(PreparedExpenseListComponent));

    expect(container.firstChild).toMatchSnapshot();
})