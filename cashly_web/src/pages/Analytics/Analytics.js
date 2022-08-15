import WidgetList from "./WidgetList/WidgetList";
import { MainLayout } from "@/layouts";
import { Page, PageMain } from "@/components";
import AnalyticsPageHeader from "./AnalyticsPageHeader";
import { DatePeriodProvider } from "./DatePeriodContext";

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
