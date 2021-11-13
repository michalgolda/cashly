import { useQuery } from "react-query";

import { Page } from "../../components";
import CategoryList from "./CategoryList/CategoryList";
import { getAllExpenseCategories } from "../../queries";
import CategoryPageHeader from "./CategoryPageHeader/CategoryPageHeader";


export default function Categories() {
    const { data, isLoading, isError } = useQuery(
        "categories",
        getAllExpenseCategories
    );

    const isEmpty = !Boolean(data && data.length);
    const showRightElementOfHeader = !isEmpty;

    return (
        <Page title="Cashly - Kategorie">
           <CategoryPageHeader showRightElement={showRightElementOfHeader} />
            <CategoryList 
                data={data} 
                isEmpty={isEmpty}
                isLoading={isLoading || isError} 
            />
        </Page>
    );
}