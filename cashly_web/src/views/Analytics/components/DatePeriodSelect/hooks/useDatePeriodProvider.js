import { useState } from 'react'

import { periods } from '@/utils/periods'

export const useDatePeriodProvider = () => {
    const [currentPeriod, setCurrentPeriod] = useState(periods.lastTwentyMonths)
    return {
        currentPeriod,
        setCurrentPeriod,
    }
}
