import { useContext } from 'react'

import { PasswordRecoveryContext } from '../context'

export const usePasswordRecovery = () => useContext(PasswordRecoveryContext)
