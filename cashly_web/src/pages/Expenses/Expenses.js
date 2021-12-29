import { useQuery } from "react-query";

import { getAllExpenses } from "../../queries";
import { Page, PageMain } from "../../components";
import ExpenseList from "./ExpenseList/ExpenseList";
import ExpensePageHeader from "./ExpensePageHeader/ExpensePageHeader";


export default function Expenses() {
    const { data, isLoading, isError } = useQuery(
        "expenses", 
        getAllExpenses
    );

    const isEmpty = !Boolean(data && data.length);
    const showRightElementOfHeader = !isEmpty;

    return (
        <Page title="Cashly - Wydatki">
            <ExpensePageHeader showRightElement={showRightElementOfHeader} />
            <PageMain>
                <ExpenseList
                    data={data}
                    isEmpty={isEmpty}
                    isLoading={isLoading || isError}
                />
            </PageMain>
        </Page>
    );
}