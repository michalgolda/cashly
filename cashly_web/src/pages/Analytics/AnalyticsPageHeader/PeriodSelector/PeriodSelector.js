import { createContext, useContext, useState } from "react";

import { Input } from "../../../../components";
import { dateToISOString } from "../../../../utilities/date";


function getPeriods() {
    const currentDate = new Date();

    const getLastSevenDaysPeriod = () => {
        const startDate = new Date();
        startDate.setDate(currentDate.getDate() - 6);

        return {
            unit: 'D',
            start_date: dateToISOString(startDate),
            end_date: dateToISOString(currentDate)
        }
    };

    const getLastFourWeeksPeriod = () => {
        const startDate = new Date();
        startDate.setDate(currentDate.getDate() - 27);

        return {
            unit: 'D',
            start_date: dateToISOString(startDate),
            end_date: dateToISOString(currentDate)
        }
    };

    const getLastThreeMonthsPeriod = () => {
        const startDate = new Date();
        startDate.setMonth(currentDate.getMonth() - 2);

        return {
            unit: 'W',
            start_date: dateToISOString(startDate),
            end_date: dateToISOString(currentDate)
        }
    };

    const getLastTwentyMonthsPeriod = () => {
        const startDate = new Date();
        startDate.setMonth(currentDate.getMonth() - 11);

        return {
            unit: 'M',
            start_date: dateToISOString(startDate),
            end_date: dateToISOString(currentDate)
        }
    };

    return {
        lastSevenDays: getLastSevenDaysPeriod(),
        lastFourWeeks: getLastFourWeeksPeriod(),
        lastThreeMonths: getLastThreeMonthsPeriod(),
        lastTwentyMonths: getLastTwentyMonthsPeriod()
    }
}

export const PeriodSelectorContext = createContext();

export function PeriodSelectorContextProvider({ children }) {
    const periods = getPeriods();
    const [currentPeriod, setCurrentPeriod] = useState(periods.lastSevenDays);
    const state = {
        periods,
        currentPeriod,
        setCurrentPeriod
    };

    return (
        <PeriodSelectorContext.Provider value={state}>
            {children}
        </PeriodSelectorContext.Provider>
    );
}

export default function PeriodSelector() {
    const { periods, setCurrentPeriod } = useContext(PeriodSelectorContext);

    const handleChangePeriod = (e) => {
        const periodKey = e.target.value;
        const period = periods[periodKey];

        setCurrentPeriod(period);
    };

    return (
        <Input as="select" onChange={handleChangePeriod}>
            <option value="lastSevenDays">Ostatnie 7 dni</option>
            <option value="lastFourWeeks">Ostatnie 4 tygodnie</option>
            <option value="lastThreeMonths">Ostatnie 3 miesiące</option>
            <option value="lastTwentyMonths">Ostatnie 12 miesięcy</option>
        </Input>
    );
}