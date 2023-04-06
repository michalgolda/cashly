import Skeleton from '@/components/Skeleton/Skeleton'

import Widget from '../Widget/Widget'
import Chart from './Chart'
import { useGetGeneralExpensesQuery } from './useGetGeneralExpensesQuery'
import { useLabelFormatter } from './useLabelFormatter'

export default function GeneralExpensesWidget() {
    const { isLoading, isError, data } = useGetGeneralExpensesQuery()
    const labelFormatter = useLabelFormatter()

    return (
        <Widget title="Generalne wydatki">
            {isLoading || isError ? (
                <Skeleton height={256} />
            ) : (
                <Chart data={data} labelFormatter={labelFormatter} />
            )}
        </Widget>
    )
}
