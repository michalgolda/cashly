import { createContext } from "react";
import { useDatePeriodProvider } from "./useDatePeriodProvider";

export const DatePeriodContext = createContext();

export const DatePeriodProvider = ({ children }) => {
  const datePeriodProvider = useDatePeriodProvider();
  return (
    <DatePeriodContext.Provider value={datePeriodProvider}>
      {children}
    </DatePeriodContext.Provider>
  );
};
