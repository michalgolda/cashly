import { useContext } from "react";
import { useQuery } from "react-query";

import Chart from "./Chart/Chart";
import Widget from "../Widget/Widget";
import { Skeleton } from "../../../components";
import { getAnalyticsData } from "../../../queries";
import { PeriodSelectorContext } from "../AnalyticsPageHeader/PeriodSelector/PeriodSelector";


export default function CountExpensesByCategoryWidget() {
    const { currentPeriod } = useContext(PeriodSelectorContext);
    const { data, isLoading, isError } = useQuery(
        ["countExpensesByCategoryAnalyticsData", { currentPeriod }],
        () => {
            return getAnalyticsData("count_expenses_by_category", {
                start_date: currentPeriod.start_date,
                end_date: currentPeriod.end_date
            })
        }
    )
    const dataIsAvailable = Boolean(data && data.length);

    return (
        <Widget title="Liczba wydatków na kategorię">
            {isLoading || isError ? <Skeleton height={256} /> : (
                <>
                    {dataIsAvailable ? <Chart data={data} /> : <p>Brak danych</p>}
                </>
            )}
        </Widget>
    )
}