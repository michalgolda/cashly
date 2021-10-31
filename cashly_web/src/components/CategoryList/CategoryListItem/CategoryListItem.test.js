import { render } from "@testing-library/react";
import withTheme from "../../../utilities/withTheme";
import CategoryListItem from "./CategoryListItem";

test("renders CategoryListItem component", () => {
    const fakeData = {
        id: "1",
        name: "test1",
        color: "#f00"
    };

    const PreparedCategoryListItemComponent = () => {
        return (
            <CategoryListItem 
                id={fakeData.id}
                name={fakeData.name}
                color={fakeData.color}
            />
        );
    }

    render(withTheme(PreparedCategoryListItemComponent));
})