import { useContext } from "react";
import { useQuery } from "react-query";
import Chart from "./Chart";
import Widget from "@/pages/Analytics/Widget/Widget";
import { Skeleton } from "@/components";
import { analyticsAPI } from "@/api";
import { PeriodSelectorContext } from "@/pages/Analytics/AnalyticsPageHeader/PeriodSelector";

export default function CountExpensesByCategoryWidget() {
  const { currentPeriod } = useContext(PeriodSelectorContext);
  const { data, isLoading, isError } = useQuery(
    ["countExpensesByCategory", { currentPeriod }],
    () =>
      analyticsAPI.getCountExpensesByCategory({
        startDate: currentPeriod.start_date,
        endDate: currentPeriod.end_date,
      })
  );
  const dataIsAvailable = Boolean(data && data.length);

  return (
    <Widget title="Liczba wydatków na kategorię">
      {isLoading || isError ? (
        <Skeleton height={256} />
      ) : (
        <>{dataIsAvailable ? <Chart data={data} /> : <p>Brak danych</p>}</>
      )}
    </Widget>
  );
}
