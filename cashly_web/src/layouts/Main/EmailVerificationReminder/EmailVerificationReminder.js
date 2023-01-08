import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

import { userAPI } from '@/api';
import { CloseButton } from '@/components';
import { notifyUnhandledError } from '@/helpers/notify';

import * as S from './EmailVerificationReminder.styled';
import { useEmailVerificationReminder } from './useEmailVerificationReminder';

export default function EmailVerificationReminder() {
  const notifySendEmailVerificationRequestSuccess = () =>
    toast.success('Kod weryfikacyjny został wysłany na podany adres email.');

  const { showReminder, hideReminder, email } = useEmailVerificationReminder();

  const sendEmailVerificationRequestMutation = useMutation(
    userAPI.sendEmailVerificationRequest,
    {
      onSuccess: () => {
        notifySendEmailVerificationRequestSuccess();
        hideReminder();
      },
      onError: () => notifyUnhandledError(),
    },
  );

  const handleSendEmailVerificationRequest = () => {
    sendEmailVerificationRequestMutation.mutate({ email });
  };

  if (!showReminder) return null;

  return (
    <S.Container>
      <S.Wrapper>
        <S.TextContainer>
          <S.Text>Twój adres email jest niezweryfikowany.</S.Text>
          <S.ResendEmailVerificationButton
            onClick={() => handleSendEmailVerificationRequest()}
          >
            Zweryfikuj
          </S.ResendEmailVerificationButton>
        </S.TextContainer>
        <CloseButton onClick={() => hideReminder()} variant="light" />
      </S.Wrapper>
    </S.Container>
  );
}
