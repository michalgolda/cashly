import { useState } from 'react'

import { initialState } from '../reducer'

export const usePersistedListOptionsState = () => {
    const getPersistedValue = (key, initialValue) => {
        if (typeof window !== 'undefined') {
            const persistedValue = JSON.parse(localStorage.getItem(key))
            return persistedValue !== null ? persistedValue : initialValue
        }
    }

    const [showSortOptionsSection] = useState(
        getPersistedValue(
            'showSortOptionsSection',
            initialState.showSortOptionsSection
        )
    )
    const [showFilterOptionsSection] = useState(
        getPersistedValue(
            'showFilterOptionsSection',
            initialState.showFilterOptionsSection
        )
    )
    const [sortParams] = useState(
        getPersistedValue('sortParams', initialState.sortParams)
    )
    const [filterParams] = useState(
        getPersistedValue('filterParams', initialState.filterParams)
    )

    return {
        showSortOptionsSection,
        showFilterOptionsSection,
        sortParams,
        filterParams,
    }
}
