import { useState } from 'react';

export const usePasswordRecoveryProvider = (passwordRecoveryToken) => {
  const [showPasswordRecoveryRequestForm, setShowPasswordRecoveryRequestForm] =
    useState(!Boolean(passwordRecoveryToken));
  const [showPasswordRecoveryProceedForm, setShowPasswordRecoveryProceedForm] =
    useState(Boolean(passwordRecoveryToken));

  return {
    passwordRecoveryToken,
    showPasswordRecoveryRequestForm,
    setShowPasswordRecoveryRequestForm,
    showPasswordRecoveryProceedForm,
    setShowPasswordRecoveryProceedForm,
  };
};
