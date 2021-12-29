import { useContext } from "react";
import { useQuery } from "react-query";

import Chart from "./Chart/Chart";
import Widget from "../Widget/Widget";
import { Skeleton } from "../../../components";
import { getAnalyticsData } from "../../../queries";
import { PeriodSelectorContext } from "../AnalyticsPageHeader/PeriodSelector/PeriodSelector";


export default function GeneralExpensesWidget() {
    const { currentPeriod } = useContext(PeriodSelectorContext);
    const { data, isLoading, isError } = useQuery(
        ["generalExpensesAnalyticsData", { currentPeriod }],
        () => {
            return getAnalyticsData("general_expenses", {
                start_date: currentPeriod.start_date,
                end_date: currentPeriod.end_date,
                unit: currentPeriod.unit
            });
        }
    );

    return (
        <Widget title="Generalne wydatki">
            {isLoading || isError ? <Skeleton height={256} /> : <Chart data={data} />}
        </Widget>
    );
}
