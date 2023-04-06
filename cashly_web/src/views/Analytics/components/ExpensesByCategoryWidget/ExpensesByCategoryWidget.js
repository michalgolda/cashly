import { useQuery } from 'react-query'

import { analyticsService } from '@/api/services'
import Skeleton from '@/components/Skeleton/Skeleton'

import { useDatePeriod } from '../DatePeriodSelect/hooks/useDatePeriod'
import Widget from '../Widget/Widget'
import Chart from './Chart'
import { useGetExpensesByCategoryQuery } from './useGetExpensesByCategoryQuery'

export default function ExpensesByCategoryWidget() {
    const { isLoading, isError, data } = useGetExpensesByCategoryQuery()

    return (
        <Widget title="Wydatki na kategorię">
            {isLoading || isError ? (
                <Skeleton height={256} />
            ) : (
                <>
                    {data && data.length ? (
                        <Chart data={data} />
                    ) : (
                        <p>Brak danych</p>
                    )}
                </>
            )}
        </Widget>
    )
}
