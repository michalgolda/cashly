import { useContext } from 'react';

import { PasswordRecoveryContext } from './PasswordRecoveryContext';

export const usePasswordRecovery = () => useContext(PasswordRecoveryContext);
