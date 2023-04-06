import Skeleton from '@/components/Skeleton/Skeleton'

import Widget from '../Widget/Widget'
import Chart from './Chart'
import { useGetCountExpensesByCategoryQuery } from './useGetCountExpensesByCategoryQuery'

export default function CountExpensesByCategoryWidget() {
    const { isLoading, isError, data } = useGetCountExpensesByCategoryQuery()

    return (
        <Widget title="Liczba wydatków na kategorię">
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
