import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import withTheme from "../../utilities/withTheme";
import LinkButton from "./LinkButton";

test("renders LinkButton component", () => {
    const PreparedLinkButtonComponent = () => {
        return (
            <MemoryRouter>
                <LinkButton to="/test">test</LinkButton>
            </MemoryRouter>
        );
    }
    
    render(withTheme(PreparedLinkButtonComponent));
})