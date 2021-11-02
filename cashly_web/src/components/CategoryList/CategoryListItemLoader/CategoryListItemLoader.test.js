import { render } from "@testing-library/react";
import withTheme from "../../../utilities/withTheme";
import CategoryListItemLoader from "./CategoryListItemLoader";

test("renders CategoryListItemLoader components", () => {
    render(withTheme(CategoryListItemLoader));
})