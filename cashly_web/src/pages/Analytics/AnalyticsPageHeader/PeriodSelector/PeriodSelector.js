import moment from "moment";
import { createContext, useContext, useState } from "react";

import { Input } from "../../../../components";

const getPeriod = (unit, subtractAmount, subtractUnit) => {
  return {
    unit,
    end_date: moment().format("YYYY-MM-DD"),
    start_date: moment()
      .subtract(subtractAmount, subtractUnit)
      .format("YYYY-MM-DD"),
  };
};

const getPeriods = () => {
  return {
    lastSevenDays: getPeriod("D", 7, "d"),
    lastFourWeeks: getPeriod("D", 4, "w"),
    lastThreeMonths: getPeriod("W", 3, "M"),
    lastTwentyMonths: getPeriod("M", 12, "M"),
  };
};

export const PeriodSelectorContext = createContext();

export function PeriodSelectorContextProvider({ children }) {
  const periods = getPeriods();
  const [currentPeriod, setCurrentPeriod] = useState(periods.lastTwentyMonths);
  const state = {
    periods,
    currentPeriod,
    setCurrentPeriod,
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
    <Input
      as="select"
      defaultValue="lastTwentyMonths"
      onChange={handleChangePeriod}
    >
      <option value="lastSevenDays">Ostatnie 7 dni</option>
      <option value="lastFourWeeks">Ostatnie 4 tygodnie</option>
      <option value="lastThreeMonths">Ostatnie 3 miesiące</option>
      <option value="lastTwentyMonths">Ostatnie 12 miesięcy</option>
    </Input>
  );
}
