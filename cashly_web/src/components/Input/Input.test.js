import { render, screen } from "@testing-library/react";
import withTheme from "../../utilities/withTheme";
import Input from "./Input";

test("renders input component", () => {
    const PreparedInputComponent = () => {
        return <Input type="text" />;
    }

    const { container } = render(withTheme(PreparedInputComponent));

    const inputElm = screen.getByTestId("input");

    expect(container.firstChild).toMatchSnapshot();
    expect(inputElm).toHaveAttribute("type", "text");
})

test("renders input component with label", () => {
    const PreparedInputComponent = () => {
        return <Input type="text" labelText="Example label" />;
    }

    const { container } = render(withTheme(PreparedInputComponent));

    const inputElm = screen.getByTestId("input");
    const labelElm = screen.getByTestId("label");

    expect(inputElm).toHaveAttribute("type", "text");
    expect(labelElm).toHaveTextContent("Example label");
    expect(container.firstChild).toMatchSnapshot();
})