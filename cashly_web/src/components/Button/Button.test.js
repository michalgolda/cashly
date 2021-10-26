import { render, screen } from "@testing-library/react";
import Button from "./Button";
import withTheme from "../../utilities/withTheme";

test("renders default variant of button component", () => {
    const PreparedButtonComponent = () => {
        return <Button>Hello, World!</Button>;
    };
    
    render(withTheme(PreparedButtonComponent));

    const buttonElm = screen.getByText("Hello, World!");

    expect(buttonElm).toMatchSnapshot();
    expect(buttonElm).toBeInTheDocument();
})

test("renders primary variant of button component", () => {
    const PreparedButtonComponent = () => {
        return <Button variant="primary">Hello, World!</Button>;
    }
    
    render(withTheme(PreparedButtonComponent));

    const buttonElm = screen.getByText("Hello, World!");

    expect(buttonElm).toBeInTheDocument();
})

test("renders primaryOutline variant of button component", () => {
    const PreparedButtonComponent = () => {
        return <Button variant="primaryOutline">Hello, World!</Button>;
    }
    
    render(withTheme(PreparedButtonComponent));

    const buttonElm = screen.getByText("Hello, World!");

    expect(buttonElm).toBeInTheDocument();
})

test("renders small size of button component", () => {
    const PreparedButtonComponent = () => {
        return <Button size="small">Hello, World!</Button>;
    }
    
    render(withTheme(PreparedButtonComponent));

    const buttonElm = screen.getByText("Hello, World!");

    expect(buttonElm).toBeInTheDocument();
})

test("renders medium size of button component", () => {
    const PreparedButtonComponent = () => {
        return <Button size="medium">Hello, World!</Button>;
    }
    
    render(withTheme(PreparedButtonComponent));

    const buttonElm = screen.getByText("Hello, World!");

    expect(buttonElm).toBeInTheDocument();
})

test("renders large size of button component", () => {
    const PreparedButtonComponent = () => {
        return <Button size="large">Hello, World!</Button>;
    }
    
    render(withTheme(PreparedButtonComponent));

    const buttonElm = screen.getByText("Hello, World!");

    expect(buttonElm).toBeInTheDocument();
    expect(buttonElm.nodeName).toBe("BUTTON");
})

test("renders button component as link", () => {
    const PreparedButtonComponent = () => {
        return <Button as="a">Hello, World!</Button>;
    }
    
    render(withTheme(PreparedButtonComponent));

    const buttonElm = screen.getByText("Hello, World!");

    expect(buttonElm).toMatchSnapshot();
    expect(buttonElm).toBeInTheDocument();
})