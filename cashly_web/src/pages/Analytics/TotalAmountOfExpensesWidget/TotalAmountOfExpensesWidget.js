import { useContext } from "react";
import { useQuery } from "react-query";
import * as S from "./TotalAmountOfExpensesWidget.styles";
import Widget from "../Widget/Widget";
import { Skeleton } from "@/components";
import { analyticsAPI } from "@/api";
import { defaultCurrencyFormat } from "@/helpers/currencyFormat";
import { PeriodSelectorContext } from "../AnalyticsPageHeader/PeriodSelector/PeriodSelector";

export default function TotalAmountOfExpensesWidget() {
  const { currentPeriod } = useContext(PeriodSelectorContext);
  const { data, isLoading, isError } = useQuery(
    ["totalAmountOfExpensesAnalyticsData", { currentPeriod }],
    () =>
      analyticsAPI.getTotalAmountOfExpenses({
        startDate: currentPeriod.start_date,
        endDate: currentPeriod.end_date,
      })
  );

  return (
    <Widget title="Suma wydatków">
      {isLoading || isError ? (
        <Skeleton height={32} width={128} />
      ) : (
        <S.TotalAmountText>
          {defaultCurrencyFormat.format(data.value)}
        </S.TotalAmountText>
      )}
    </Widget>
  );
}
