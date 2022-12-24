import { useQuery } from 'react-query';

import { analyticsAPI } from '@/api';
import { Skeleton } from '@/components';
import Widget from '@/pages/Analytics/Widget/Widget';
import { useDatePeriod } from '@/pages/Analytics/useDatePeriod';

import * as S from '../TotalAmountOfExpensesWidget/TotalAmountOfExpensesWidget.styled';

export default function CountAllExpensesWidget() {
  const { currentPeriod } = useDatePeriod();
  const countAllExpensesQuery = useQuery(
    ['countAllExpenses', { currentPeriod }],
    () =>
      analyticsAPI.getCountAllExpenses({
        startDate: currentPeriod.start_date,
        endDate: currentPeriod.end_date,
      }),
  );

  if (countAllExpensesQuery.isLoading || countAllExpensesQuery.isError)
    return (
      <Widget title="Liczba wydatków">
        <Skeleton height={32} width={128} />
      </Widget>
    );

  return (
    <Widget title="Liczba wydatków">
      <S.TotalAmountText>{countAllExpensesQuery.data.value}</S.TotalAmountText>
    </Widget>
  );
}
