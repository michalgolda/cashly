import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Layout from "./Layout";
import withTheme from "../../utilities/withTheme";


test("renders layout component", () => {
    const PreparedLayoutComponent = () => {
        return (
            <MemoryRouter>
                <Layout>children prop is required</Layout>
            </MemoryRouter>
        );
    }

    render(withTheme(PreparedLayoutComponent));
})