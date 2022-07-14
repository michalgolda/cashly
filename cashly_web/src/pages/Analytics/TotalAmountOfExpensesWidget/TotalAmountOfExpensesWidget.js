import { useContext } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";

import Widget from "../Widget/Widget";
import { Skeleton } from "@/components";
import { analyticsAPI } from "@/api";
import { PeriodSelectorContext } from "../AnalyticsPageHeader/PeriodSelector/PeriodSelector";

const StyledTotalAmountText = styled.p`
  color: ${({ theme }) => theme.colors.blue400};
  font-size: ${({ theme }) => theme.fontSizes.h5};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
`;

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
        <StyledTotalAmountText>{data.value} PLN</StyledTotalAmountText>
      )}
    </Widget>
  );
}
