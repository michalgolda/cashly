import { useContext } from "react";
import { useQuery } from "react-query";

import Chart from "./Chart";
import Widget from "@/pages/Analytics/Widget/Widget";
import { Skeleton } from "@/components";
import { analyticsAPI } from "@/api";
import { PeriodSelectorContext } from "@/pages/Analytics/AnalyticsPageHeader/PeriodSelector";

export default function GeneralExpensesWidget() {
  const { currentPeriod } = useContext(PeriodSelectorContext);
  const { data, isLoading, isError } = useQuery(
    ["generalExpenses", { currentPeriod }],
    () =>
      analyticsAPI.getGeneralExpenses({
        unit: currentPeriod.unit,
        startDate: currentPeriod.start_date,
        endDate: currentPeriod.end_date,
      })
  );

  return (
    <Widget title="Generalne wydatki">
      {isLoading || isError ? <Skeleton height={256} /> : <Chart data={data} />}
    </Widget>
  );
}
