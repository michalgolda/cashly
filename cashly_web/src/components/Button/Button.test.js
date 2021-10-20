import { render, screen } from "@testing-library/react";
import Button from "./Button";
import withTheme from "../../utilities/withTheme";

test("renders button component", () => {
    const ButtonComponent = () => <Button>Hello, World!</Button>;

    const { container } = render(withTheme(ButtonComponent));

    const buttonElm = screen.getByText("Hello, World!");

    expect(buttonElm).toBeInTheDocument();
    expect(buttonElm.nodeName).toBe("BUTTON");

    expect(container.firstChild).toMatchSnapshot();
})