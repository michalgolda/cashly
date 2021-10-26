import { render, screen } from "@testing-library/react";
import Header from "./Header";
import withTheme from "../../utilities/withTheme";

test("renders header component", () => {
    const { container } = render(withTheme(Header));

    const headerElm = screen.getByText("Cashly");

    expect(headerElm).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
});