import { useQuery } from 'react-query'

import { analyticsService } from '@/api/services'
import Skeleton from '@/components/Skeleton/Skeleton'

import { useDatePeriod } from '../DatePeriodSelect/hooks/useDatePeriod'
import Widget from '../Widget/Widget'
import Chart from './Chart'

export default function CountExpensesByCategoryWidget() {
    const { currentPeriod } = useDatePeriod()
    const { data, isLoading, isError } = useQuery(
        ['countExpensesByCategory', { currentPeriod }],
        () =>
            analyticsService.getCountExpensesByCategory({
                startDate: currentPeriod.start_date,
                endDate: currentPeriod.end_date,
            })
    )
    const dataIsAvailable = Boolean(data && data.length)

    return (
        <Widget title="Liczba wydatków na kategorię">
            {isLoading || isError ? (
                <Skeleton height={256} />
            ) : (
                <>
                    {dataIsAvailable ? (
                        <Chart data={data} />
                    ) : (
                        <p>Brak danych</p>
                    )}
                </>
            )}
        </Widget>
    )
}
