import { useSearchParams } from 'react-router-dom';

import { AuthLayout } from '@/layouts';

import { PasswordRecoveryProvider } from './PasswordRecoveryContext';
import PasswordRecoveryProceedForm from './PasswordRecoveryProceedForm/PasswordRecoveryProceedForm';
import PasswordRecoveryRequestForm from './PasswordRecoveryRequestForm/PasswordRecoveryRequestForm';
import { usePasswordRecoveryProvider } from './usePasswordRecoveryProvider';

export default function PasswordRecovery() {
  const [searchParams, _] = useSearchParams();
  const passwordRecoveryToken = searchParams.get('password_recovery_token');

  const passwordRecoveryProvider = usePasswordRecoveryProvider(
    passwordRecoveryToken,
  );
  const { showPasswordRecoveryRequestForm, showPasswordRecoveryProceedForm } =
    passwordRecoveryProvider;

  return (
    <AuthLayout>
      <PasswordRecoveryProvider provider={passwordRecoveryProvider}>
        {showPasswordRecoveryRequestForm && <PasswordRecoveryRequestForm />}
        {showPasswordRecoveryProceedForm && <PasswordRecoveryProceedForm />}
      </PasswordRecoveryProvider>
    </AuthLayout>
  );
}
