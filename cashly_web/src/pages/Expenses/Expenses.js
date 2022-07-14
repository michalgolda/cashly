import { useQuery } from "react-query";

import { expenseAPI } from "@/api";
import { Page, PageMain, Layout } from "@/components";
import ExpenseList from "./ExpenseList/ExpenseList";
import ExpensePageHeader from "./ExpensePageHeader/ExpensePageHeader";

export default function Expenses() {
  const { data, isLoading, isError } = useQuery(
    "expenses",
    expenseAPI.getAllExpenses
  );

  const isEmpty = !Boolean(data && data.length);
  const showRightElementOfHeader = !isEmpty;

  return (
    <Page title="Cashly - Wydatki">
      <Layout>
        <ExpensePageHeader showRightElement={showRightElementOfHeader} />
        <PageMain>
          <ExpenseList
            data={data}
            isEmpty={isEmpty}
            isLoading={isLoading || isError}
          />
        </PageMain>
      </Layout>
    </Page>
  );
}
