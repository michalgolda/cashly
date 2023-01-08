import { useEffect } from 'react';

import { Footer, Sidebar } from '@/components';

import EmailVerificationReminder from './EmailVerificationReminder/EmailVerificationReminder';
import { useEmailVerificationReminder } from './EmailVerificationReminder/useEmailVerificationReminder';
import * as S from './Main.styled';

export default function Layout({ children, ...props }) {
  return (
    <S.Main {...props}>
      <Sidebar />
      <S.Content>
        <EmailVerificationReminder />
        {children}
        <Footer />
      </S.Content>
    </S.Main>
  );
}
