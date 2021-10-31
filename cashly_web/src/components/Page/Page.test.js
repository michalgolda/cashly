import { render } from "@testing-library/react";
import { Page } from "./Page";

test("renders Page component" , () => {
    const PreparedPageComponent = () => {
        return <Page title="test" />;
    }
    
    render(PreparedPageComponent);
})