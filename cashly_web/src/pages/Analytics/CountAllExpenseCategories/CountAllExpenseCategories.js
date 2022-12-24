import { useQuery } from 'react-query';

import { analyticsAPI } from '@/api';
import { Skeleton } from '@/components';
import Widget from '@/pages/Analytics/Widget/Widget';
import { useDatePeriod } from '@/pages/Analytics/useDatePeriod';

import * as S from '../TotalAmountOfExpensesWidget/TotalAmountOfExpensesWidget.styled';

export default function CountAllExpenseCategories() {
  const { currentPeriod } = useDatePeriod();
  const countAllExpenseCategoriesQuery = useQuery(
    ['countAllExpenseCategories', { currentPeriod }],
    () =>
      analyticsAPI.getCountAllExpenseCategories({
        startDate: currentPeriod.start_date,
        endDate: currentPeriod.end_date,
      }),
  );

  if (
    countAllExpenseCategoriesQuery.isLoading ||
    countAllExpenseCategoriesQuery.isError
  )
    return (
      <Widget title="Liczba kategorii">
        <Skeleton height={32} width={128} />
      </Widget>
    );

  return (
    <Widget title="Liczba kategorii">
      <S.TotalAmountText>
        {countAllExpenseCategoriesQuery.data.value - 1}
      </S.TotalAmountText>
    </Widget>
  );
}
