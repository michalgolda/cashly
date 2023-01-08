import { useState, useEffect } from 'react';

import { useSession } from '@/hooks/useSession';

export const useEmailVerificationReminder = () => {
  const { user } = useSession();
  const [showReminder, setShowReminder] = useState(() => {
    let showEmailVerificationReminder = JSON.parse(
      localStorage.getItem('showEmailVerificationReminder'),
    );
    if (showEmailVerificationReminder === null)
      showEmailVerificationReminder = true;

    return !user.email_is_verified && showEmailVerificationReminder;
  });

  useEffect(() => {
    window.addEventListener('logout', () =>
      localStorage.removeItem('showEmailVerificationReminder'),
    );
  }, []);

  useEffect(() => {
    localStorage.setItem('showEmailVerificationReminder', showReminder);
  }, [showReminder]);

  const hideReminder = () => setShowReminder(false);

  return {
    showReminder,
    hideReminder,
    email: user.email,
  };
};
