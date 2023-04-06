import { defaultDateTimeFormat } from '@/utils/defaultDateTimeFormat'
import { monthDateTimeFormat } from '@/utils/monthDateTimeFormat'

import { useDatePeriod } from '../DatePeriodSelect/hooks/useDatePeriod'

export const useLabelFormatter = () => {
    const { currentPeriod } = useDatePeriod()
    return (stringDate) => {
        const [datePartOne, datePartTwo] = stringDate.split('/')
        const dateTimeFormat =
            currentPeriod.unit === 'M'
                ? monthDateTimeFormat
                : defaultDateTimeFormat

        const dateWithoutRange = () =>
            `${dateTimeFormat.format(new Date(datePartOne))}`
        const dateWithRange = () =>
            `${dateTimeFormat.format(
                new Date(datePartOne)
            )} - ${dateTimeFormat.format(new Date(datePartTwo))}`
        return datePartOne && datePartTwo ? dateWithRange() : dateWithoutRange()
    }
}
