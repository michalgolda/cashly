import { render } from "@testing-library/react";
import withTheme from "../../../../utilities/withTheme";
import DeleteButton from "./DeleteButton";

test("renders DeleteButton component", () => {
    const { container } = render(withTheme(DeleteButton));

    expect(container.firstChild).toMatchSnapshot();
})