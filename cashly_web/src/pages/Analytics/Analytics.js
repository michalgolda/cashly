import WidgetList from "./WidgetList/WidgetList";
import { MainLayout } from "@/layouts";
import { Page, PageMain } from "@/components";
import AnalyticsPageHeader from "./AnalyticsPageHeader/AnalyticsPageHeader";
import { PeriodSelectorContextProvider } from "./AnalyticsPageHeader/PeriodSelector";

export default function Analytics() {
  return (
    <Page title="Cashly - Analityka">
      <MainLayout>
        <PeriodSelectorContextProvider>
          <AnalyticsPageHeader />
          <PageMain>
            <WidgetList />
          </PageMain>
        </PeriodSelectorContextProvider>
      </MainLayout>
    </Page>
  );
}
