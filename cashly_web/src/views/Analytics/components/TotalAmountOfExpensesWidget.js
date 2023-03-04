import { useQuery } from 'react-query'

import { analyticsService } from '@/api/services'
import Skeleton from '@/components/Skeleton/Skeleton'
import { defaultCurrencyFormat } from '@/utils/defaultCurrencyFormat'

import { useDatePeriod } from './DatePeriodSelect/hooks/useDatePeriod'
import TotalAmountText from './TotalAmountText'
import Widget from './Widget/Widget'

export default function TotalAmountOfExpensesWidget() {
    const { currentPeriod } = useDatePeriod()
    const { data, isLoading, isError } = useQuery(
        ['totalAmountOfExpenses', { currentPeriod }],
        () =>
            analyticsService.getTotalAmountOfExpenses({
                startDate: currentPeriod.start_date,
                endDate: currentPeriod.end_date,
            })
    )

    return (
        <Widget title="Suma wydatków">
            {isLoading || isError ? (
                <Skeleton height={8} width={128} />
            ) : (
                <TotalAmountText>
                    {defaultCurrencyFormat.format(data.value)}
                </TotalAmountText>
            )}
        </Widget>
    )
}
