import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { userAPI } from '@/api';
import { notifyUnhandledError } from '@/helpers/notify';

export default function VerifyEmail() {
  const notifyVerifyEmailSuccess = () =>
    toast.success('Adres email został pomyślnie potwierdzony');

  const verifyEmailMutation = useMutation(userAPI.verifyEmail, {
    onSuccess: () => {
      notifyVerifyEmailSuccess();
      navigate('/');
    },
    onError: () => {
      notifyUnhandledError();
      navigate('/');
    },
  });

  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();

  useEffect(() => {
    const emailVerificationToken = searchParams.get('emailVerificationToken');
    emailVerificationToken &&
      verifyEmailMutation.mutateAsync({ emailVerificationToken });
    !emailVerificationToken && navigate('/');
  }, []);

  return null;
}
