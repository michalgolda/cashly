import { render } from "@testing-library/react";
import withTheme from "../../utilities/withTheme";
import Section from "./Section";

test("renders Section component", () => {
    const PreparedSectionComponent = () => {
        return (
            <Section 
                title="test"
                description="test"
            />
        );
    }

    render(withTheme(PreparedSectionComponent));
})