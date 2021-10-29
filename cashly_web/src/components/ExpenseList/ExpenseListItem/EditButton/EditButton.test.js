import { render } from "@testing-library/react";
import withTheme from "../../../../utilities/withTheme";
import EditButton from "./EditButton";

test("renders EditButton component", () => {
    const { container } = render(withTheme(EditButton));

    expect(container.firstChild).toMatchSnapshot();
})