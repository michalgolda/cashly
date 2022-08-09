import WidgetList from "./WidgetList/WidgetList";
import { Page, PageMain, Layout } from "../../components";
import AnalyticsPageHeader from "./AnalyticsPageHeader/AnalyticsPageHeader";
import { PeriodSelectorContextProvider } from "./AnalyticsPageHeader/PeriodSelector/PeriodSelector";

export default function Analytics() {
  return (
    <Page title="Cashly - Analityka">
      <Layout>
        <PeriodSelectorContextProvider>
          <AnalyticsPageHeader />
          <PageMain>
            <WidgetList />
          </PageMain>
        </PeriodSelectorContextProvider>
      </Layout>
    </Page>
  );
}
