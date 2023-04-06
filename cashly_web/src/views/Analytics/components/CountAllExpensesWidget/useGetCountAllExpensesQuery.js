import { useQuery } from 'react-query'

import { analyticsService } from '@/api/services'

import { useDatePeriod } from '../DatePeriodSelect/hooks/useDatePeriod'

export const useGetCountAllExpensesQuery = () => {
    const { currentPeriod } = useDatePeriod()

    return useQuery(['countAllExpenses', { currentPeriod }], () =>
        analyticsService.getCountAllExpenses({
            startDate: currentPeriod.start_date,
            endDate: currentPeriod.end_date,
        })
    )
}
