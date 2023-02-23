import { createContext } from 'react'

export const ListOptionsContext = createContext()

export const ListOptionsProvider = ({ children, reducer }) => {
    return (
        <ListOptionsContext.Provider value={reducer}>
            {children}
        </ListOptionsContext.Provider>
    )
}
