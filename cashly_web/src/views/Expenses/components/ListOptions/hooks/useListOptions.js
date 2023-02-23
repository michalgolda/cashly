import { useContext } from 'react'

import { ListOptionsContext } from '../context'

export const useListOptions = () => useContext(ListOptionsContext)
