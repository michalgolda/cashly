import { useContext } from "react";
import { useQuery } from "react-query";

import Chart from "./Chart/Chart";
import Widget from "../Widget/Widget";
import { Skeleton } from "@/components";
import { analyticsAPI } from "@/api";
import { PeriodSelectorContext } from "../AnalyticsPageHeader/PeriodSelector/PeriodSelector";

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
