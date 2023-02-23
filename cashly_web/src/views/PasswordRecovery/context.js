import { createContext } from 'react'

export const PasswordRecoveryContext = createContext()

export const PasswordRecoveryProvider = ({ children, provider }) => {
    return (
        <PasswordRecoveryContext.Provider value={provider}>
            {children}
        </PasswordRecoveryContext.Provider>
    )
}
