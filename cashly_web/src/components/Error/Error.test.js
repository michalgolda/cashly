import { render, screen } from "@testing-library/react";
import withTheme from "../../utilities/withTheme";
import Error from "./Error";

test("renders Error component", () => {
    const PreparedErrorComponent = () => {
        return <Error message="Test message" />;
    }

    render(withTheme(PreparedErrorComponent));

    const errorElm = screen.getByText("Test message");

    expect(errorElm).toBeInTheDocument();
})