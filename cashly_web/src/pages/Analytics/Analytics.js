import { Page, PageMain } from '@/components';
import { MainLayout } from '@/layouts';

import AnalyticsPageHeader from './AnalyticsPageHeader';
import { DatePeriodProvider } from './DatePeriodContext';
import WidgetList from './WidgetList/WidgetList';

export default function Analytics() {
  return (
    <Page title="Cashly - Analityka">
      <MainLayout>
        <DatePeriodProvider>
          <AnalyticsPageHeader />
          <PageMain>
            <WidgetList />
          </PageMain>
        </DatePeriodProvider>
      </MainLayout>
    </Page>
  );
}
