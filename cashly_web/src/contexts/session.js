import { createContext } from 'react';

import { useSessionProvider } from '@/hooks/useSessionProvider';

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const sessionProvider = useSessionProvider();
  return (
    <SessionContext.Provider value={sessionProvider}>
      {children}
    </SessionContext.Provider>
  );
};
