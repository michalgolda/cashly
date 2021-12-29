import WidgetList from "./WidgetList/WidgetList";
import { Page, PageMain } from "../../components";
import AnalyticsPageHeader from "./AnalyticsPageHeader/AnalyticsPageHeader";
import { PeriodSelectorContextProvider } from "./AnalyticsPageHeader/PeriodSelector/PeriodSelector";


export default function Analytics() {
	return (
		<Page title="Cashly - Analityka">
			<PeriodSelectorContextProvider>
				<AnalyticsPageHeader />
				<PageMain>
					<WidgetList />
				</PageMain>
			</PeriodSelectorContextProvider>
		</Page>
	);
}