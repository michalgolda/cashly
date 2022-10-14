import { createContext } from "react";

export const ForgotPasswordContext = createContext();

export const ForgotPasswordProvider = ({ children, forgotProvider }) => {
  return (
    <ForgotPasswordContext.Provider value={forgotProvider}>
      {children}
    </ForgotPasswordContext.Provider>
  );
};
