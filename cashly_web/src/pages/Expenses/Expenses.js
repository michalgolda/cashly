import { useQuery } from "react-query";

import { Page } from "../../components";
import { getAllExpenses } from "../../queries";
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
            <ExpenseList 
                data={data}
                isEmpty={isEmpty}
                isLoading={isLoading || isError}
            />
        </Page>
    );
}