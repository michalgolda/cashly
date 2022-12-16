import { useState } from 'react';

import { periods } from '@/helpers/datePeriods';

export const useDatePeriodProvider = () => {
  const [currentPeriod, setCurrentPeriod] = useState(periods.lastTwentyMonths);
  return {
    currentPeriod,
    setCurrentPeriod,
  };
};
