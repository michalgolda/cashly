import { useQuery } from 'react-query'

import { analyticsService } from '@/api/services'
import Skeleton from '@/components/Skeleton/Skeleton'
import { defaultDateTimeFormat } from '@/utils/defaultDateTimeFormat'
import { monthDateTimeFormat } from '@/utils/monthDateTimeFormat'

import { useDatePeriod } from '../DatePeriodSelect/hooks/useDatePeriod'
import Widget from '../Widget/Widget'
import Chart from './Chart'

export default function GeneralExpensesWidget() {
    const { currentPeriod } = useDatePeriod()
    const { data, isLoading, isError } = useQuery(
        ['generalExpenses', { currentPeriod }],
        () =>
            analyticsService.getGeneralExpenses({
                unit: currentPeriod.unit,
                startDate: currentPeriod.start_date,
                endDate: currentPeriod.end_date,
            })
    )

    const labelFormatter = (stringDate) => {
        const [datePartOne, datePartTwo] = stringDate.split('/')
        const formater =
            currentPeriod.unit === 'M'
                ? monthDateTimeFormat
                : defaultDateTimeFormat

        const dateWithoutRange = () =>
            `${formater.format(new Date(datePartOne))}`
        const dateWithRange = () =>
            `${formater.format(new Date(datePartOne))} - ${formater.format(
                new Date(datePartTwo)
            )}`
        return datePartOne && datePartTwo ? dateWithRange() : dateWithoutRange()
    }

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
