import { useQuery } from "react-query";
import Chart from "./Chart";
import Widget from "@/pages/Analytics/Widget/Widget";
import { Skeleton } from "@/components";
import { analyticsAPI } from "@/api";
import { useDatePeriod } from "@/pages/Analytics/useDatePeriod";
import { defaultDateTimeFormat } from "@/helpers/formating";

export default function GeneralExpensesWidget() {
  const { currentPeriod } = useDatePeriod();
  const { data, isLoading, isError } = useQuery(
    ["generalExpenses", { currentPeriod }],
    () =>
      analyticsAPI.getGeneralExpenses({
        unit: currentPeriod.unit,
        startDate: currentPeriod.start_date,
        endDate: currentPeriod.end_date,
      })
  );

  const labelFormatter = (stringDate) => {
    const [datePartOne, datePartTwo] = stringDate.split("/");
    const dateWithoutRange = () => `${defaultDateTimeFormat.format(new Date(datePartOne))}`;
    const dateWithRange = () => `${defaultDateTimeFormat.format(new Date(datePartOne))} - ${defaultDateTimeFormat.format(new Date(datePartTwo))}`;
    return datePartOne && datePartTwo ? dateWithRange() : dateWithoutRange();
  }

  return (
    <Widget title="Generalne wydatki">
      {isLoading || isError ? <Skeleton height={256} /> : <Chart data={data} labelFormatter={labelFormatter} />}
    </Widget>
  );
}
