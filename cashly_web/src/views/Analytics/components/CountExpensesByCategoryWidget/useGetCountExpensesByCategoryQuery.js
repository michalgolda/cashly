import { useQuery } from 'react-query'

import { analyticsService } from '@/api/services'

import { useDatePeriod } from '../DatePeriodSelect/hooks/useDatePeriod'

export const useGetCountExpensesByCategoryQuery = () => {
    const { currentPeriod } = useDatePeriod()

    return useQuery(['countExpensesByCategory', { currentPeriod }], () =>
        analyticsService.getCountExpensesByCategory({
            startDate: currentPeriod.start_date,
            endDate: currentPeriod.end_date,
        })
    )
}
