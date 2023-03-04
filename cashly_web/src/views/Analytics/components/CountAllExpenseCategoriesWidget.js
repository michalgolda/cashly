import { useQuery } from 'react-query'

import { analyticsService } from '@/api/services'
import Skeleton from '@/components/Skeleton/Skeleton'

import { useDatePeriod } from './DatePeriodSelect/hooks/useDatePeriod'
import TotalAmountText from './TotalAmountText'
import Widget from './Widget/Widget'

export default function CountAllExpenseCategoriesWidget() {
    const { currentPeriod } = useDatePeriod()

    const countAllExpenseCategoriesQuery = useQuery(
        ['countAllExpenseCategories', { currentPeriod }],
        () =>
            analyticsService.getCountAllExpenseCategories({
                startDate: currentPeriod.start_date,
                endDate: currentPeriod.end_date,
            })
    )

    if (
        countAllExpenseCategoriesQuery.isLoading ||
        countAllExpenseCategoriesQuery.isError
    )
        return (
            <Widget title="Liczba kategorii">
                <Skeleton height={8} width={128} />
            </Widget>
        )

    return (
        <Widget title="Liczba kategorii">
            <TotalAmountText>
                {countAllExpenseCategoriesQuery.data.value}
            </TotalAmountText>
        </Widget>
    )
}
