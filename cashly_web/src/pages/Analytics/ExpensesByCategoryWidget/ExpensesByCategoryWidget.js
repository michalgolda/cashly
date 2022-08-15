import { useQuery } from "react-query";
import Chart from "./Chart";
import Widget from "@/pages/Analytics/Widget/Widget";
import { Skeleton } from "@/components";
import { analyticsAPI } from "@/api";
import { useDatePeriod } from "@/pages/Analytics/useDatePeriod";

export default function ExpensesByCategoryWidget() {
  const { currentPeriod } = useDatePeriod();
  const { data, isLoading, isError } = useQuery(
    ["expensesByCategory", { currentPeriod }],
    () =>
      analyticsAPI.getExpensesByCategory({
        unit: currentPeriod.unit,
        startDate: currentPeriod.start_date,
        endDate: currentPeriod.end_date,
      })
  );
  const dataIsAvailable = Boolean(data && data.length);

  return (
    <Widget title="Wydatki na kategorię">
      {isLoading || isError ? (
        <Skeleton height={256} />
      ) : (
        <>{dataIsAvailable ? <Chart data={data} /> : <p>Brak danych</p>}</>
      )}
    </Widget>
  );
}
