import { useEffect, useState } from 'react'

export const useEmailVerificationReminder = (emailIsVerified) => {
    const [isHidden, setIsHidden] = useState(true)

    const clearPersistedValue = () =>
        localStorage.removeItem('emailVerificationReminderIsHidden')
    const setPersistedValue = (value) =>
        localStorage.setItem('emailVerificationReminderIsHidden', value)
    const getPersistedValue = () => {
        const persistedValue = JSON.parse(
            localStorage.getItem('emailVerificationReminderIsHidden')
        )
        return persistedValue
    }

    const show = () => {
        setIsHidden(false)
        setPersistedValue(false)
    }
    const hide = () => {
        setIsHidden(true)
        setPersistedValue(true)
    }
    const reset = () => clearPersistedValue()

    useEffect(() => {
        const persistedValue = getPersistedValue()
        const newValue = !persistedValue && !emailIsVerified
        setIsHidden(newValue)
        setPersistedValue(newValue)
    }, [])

    return {
        show,
        hide,
        reset,
        isHidden,
    }
}
