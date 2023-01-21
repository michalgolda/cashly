import { createContext } from 'react';

export const ExpenseListOptionsContext = createContext();

export const ExpenseListOptionsProvider = ({ children, reducer }) => {
  return (
    <ExpenseListOptionsContext.Provider value={reducer}>
      {children}
    </ExpenseListOptionsContext.Provider>
  );
};
