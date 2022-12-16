import { useQuery } from 'react-query';

import { analyticsAPI } from '@/api';
import { Skeleton } from '@/components';
import { defaultCurrencyFormat } from '@/helpers/formating';
import Widget from '@/pages/Analytics/Widget/Widget';
import { useDatePeriod } from '@/pages/Analytics/useDatePeriod';

import * as S from './TotalAmountOfExpensesWidget.styled';

export default function TotalAmountOfExpensesWidget() {
  const { currentPeriod } = useDatePeriod();
  const { data, isLoading, isError } = useQuery(
    ['totalAmountOfExpenses', { currentPeriod }],
    () =>
      analyticsAPI.getTotalAmountOfExpenses({
        startDate: currentPeriod.start_date,
        endDate: currentPeriod.end_date,
      }),
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
