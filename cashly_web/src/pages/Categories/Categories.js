import { useQuery } from 'react-query';

import { expenseCategoryAPI } from '@/api';
import { Page, PageMain } from '@/components';
import { MainLayout } from '@/layouts';

import CategoryList from './CategoryList/CategoryList';
import CategoryPageHeader from './CategoryPageHeader';

export default function Categories() {
  const { data, isLoading, isError } = useQuery(
    'categories',
    expenseCategoryAPI.getAllExpenseCategories,
  );

  const isEmpty = !Boolean(data && data.length);
  const showRightElementOfHeader = !isEmpty;

  return (
    <Page title="Cashly - Kategorie">
      <MainLayout>
        <CategoryPageHeader showRightElement={showRightElementOfHeader} />
        <PageMain>
          <CategoryList
            data={data}
            isEmpty={isEmpty}
            isLoading={isLoading || isError}
          />
        </PageMain>
      </MainLayout>
    </Page>
  );
}
