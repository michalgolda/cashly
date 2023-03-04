import { useQuery } from 'react-query'

import { analyticsService } from '@/api/services'
import Skeleton from '@/components/Skeleton/Skeleton'

import { useDatePeriod } from './DatePeriodSelect/hooks/useDatePeriod'
import TotalAmountText from './TotalAmountText'
import Widget from './Widget/Widget'

export default function CountAllExpensesWidget() {
    const { currentPeriod } = useDatePeriod()
    const countAllExpensesQuery = useQuery(
        ['countAllExpenses', { currentPeriod }],
        () =>
            analyticsService.getCountAllExpenses({
                startDate: currentPeriod.start_date,
                endDate: currentPeriod.end_date,
            })
    )

    if (countAllExpensesQuery.isLoading || countAllExpensesQuery.isError)
        return (
            <Widget title="Liczba wydatków">
                <Skeleton height={8} width={128} />
            </Widget>
        )

    return (
        <Widget title="Liczba wydatków">
            <TotalAmountText>
                {countAllExpensesQuery.data.value}
            </TotalAmountText>
        </Widget>
    )
}
