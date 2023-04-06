import { useQuery } from 'react-query'

import { analyticsService } from '@/api/services'

import { useDatePeriod } from '../DatePeriodSelect/hooks/useDatePeriod'

export const useGetTotalAmountOfExpensesQuery = () => {
    const { currentPeriod } = useDatePeriod()

    return useQuery(['totalAmountOfExpenses', { currentPeriod }], () =>
        analyticsService.getTotalAmountOfExpenses({
            startDate: currentPeriod.start_date,
            endDate: currentPeriod.end_date,
        })
    )
}
