import { render, screen } from "@testing-library/react";
import Header from "./Header";
import withTheme from "../../utilities/withTheme";

test("renders header component", () => {
    const { container } = render(withTheme(Header));

    const headingElm = screen.getByText("Cashly");

    expect(headingElm).toBeInTheDocument();
    expect(headingElm.nodeName).toBe("P");

    expect(container.firstChild).toMatchSnapshot();
});