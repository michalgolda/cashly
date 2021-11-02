import { render } from "@testing-library/react";
import withTheme from "../../../utilities/withTheme";
import ExpenseListItemLoader from "./ExpenseListItemLoader";

test("renders ExpenseListItemLoader component", () => {
    render(withTheme(ExpenseListItemLoader));
})