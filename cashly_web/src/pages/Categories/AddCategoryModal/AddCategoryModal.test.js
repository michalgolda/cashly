import { render } from "@testing-library/react";
import withTheme from "../../utilities/withTheme";
import AddCategoryModal from "./AddCategoryModal";

test("renders AddCategoryModal component", () => {
	render(withTheme(AddCategoryModal));
})