import { useQuery } from "react-query";

import { Page, PageMain, Layout } from "@/components";
import CategoryList from "./CategoryList/CategoryList";
import { expenseCategoryAPI } from "@/api";
import CategoryPageHeader from "./CategoryPageHeader/CategoryPageHeader";

export default function Categories() {
  const { data, isLoading, isError } = useQuery(
    "categories",
    expenseCategoryAPI.getAllExpenseCategories
  );

  const isEmpty = !Boolean(data && data.length);
  const showRightElementOfHeader = !isEmpty;

  return (
    <Page title="Cashly - Kategorie">
      <Layout>
        <CategoryPageHeader showRightElement={showRightElementOfHeader} />
        <PageMain>
          <CategoryList
            data={data}
            isEmpty={isEmpty}
            isLoading={isLoading || isError}
          />
        </PageMain>
      </Layout>
    </Page>
  );
}
