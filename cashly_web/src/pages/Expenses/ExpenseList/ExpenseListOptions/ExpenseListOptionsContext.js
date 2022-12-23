import { createContext } from 'react';

export const ExpenseListOptionsContext = createContext();

export const ExpenseListOptionsProvider = ({ children, provider }) => {
  return (
    <ExpenseListOptionsContext.Provider value={provider}>
      {children}
    </ExpenseListOptionsContext.Provider>
  );
};
