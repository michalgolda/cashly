import { render } from "@testing-library/react";
import { Sidebar } from "..";
import withTheme from "../../utilities/withTheme";

test("renders sidebar component", () => {
    const { container } =  render(withTheme(Sidebar));

    expect(container.firstChild).toMatchSnapshot();
})