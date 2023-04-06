import { useQuery } from 'react-query'

import { analyticsService } from '@/api/services'

import { useDatePeriod } from '../DatePeriodSelect/hooks/useDatePeriod'

export const useGetCountAllExpenseCategoriesQuery = () => {
    const { currentPeriod } = useDatePeriod()

    return useQuery(['countAllExpenseCategories', { currentPeriod }], () =>
        analyticsService.getCountAllExpenseCategories({
            startDate: currentPeriod.start_date,
            endDate: currentPeriod.end_date,
        })
    )
}
