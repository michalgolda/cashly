import { useQuery } from 'react-query'

import { analyticsService } from '@/api/services'

import { useDatePeriod } from '../DatePeriodSelect/hooks/useDatePeriod'

export const useGetExpensesByCategoryQuery = () => {
    const { currentPeriod } = useDatePeriod()

    return useQuery(['expensesByCategory', { currentPeriod }], () =>
        analyticsService.getExpensesByCategory({
            unit: currentPeriod.unit,
            startDate: currentPeriod.start_date,
            endDate: currentPeriod.end_date,
        })
    )
}
