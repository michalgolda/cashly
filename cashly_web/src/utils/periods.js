import { getPeriod } from './getPeriod'

export const periods = {
    lastSevenDays: getPeriod('D', 7, 'd'),
    lastFourWeeks: getPeriod('D', 4, 'w'),
    lastThreeMonths: getPeriod('W', 3, 'M'),
    lastTwentyMonths: getPeriod('M', 12, 'M'),
}
