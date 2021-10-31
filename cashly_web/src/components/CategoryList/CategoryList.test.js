import { render } from "@testing-library/react";
import withTheme from "../../utilities/withTheme";
import CategoryList from "./CategoryList";

test("renders CategoryList component", () => {
    const fakeData = [
        {
            id: "1",
            name: "test1",
            color: "#f00"
        },
        {
            id: "2",
            name: "test2",
            color: "#f00"
        }
    ];

    const PreparedCategoryListComponent = () => {
        return <CategoryList data={fakeData} />;
    }
    
    render(withTheme(PreparedCategoryListComponent));
})