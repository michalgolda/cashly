import { useContext } from 'react';

import { DatePeriodContext } from './DatePeriodContext';

export const useDatePeriod = () => useContext(DatePeriodContext);
