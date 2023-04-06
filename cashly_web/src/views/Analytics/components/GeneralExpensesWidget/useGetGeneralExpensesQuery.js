import { useQuery } from 'react-query'

import { analyticsService } from '@/api/services'

import { useDatePeriod } from '../DatePeriodSelect/hooks/useDatePeriod'

export const useGetGeneralExpensesQuery = () => {
    const { currentPeriod } = useDatePeriod()

    return useQuery(['generalExpenses', { currentPeriod }], () =>
        analyticsService.getGeneralExpenses({
            unit: currentPeriod.unit,
            startDate: currentPeriod.start_date,
            endDate: currentPeriod.end_date,
        })
    )
}
