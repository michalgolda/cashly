import { FormError } from '@/components';

import * as S from './AuthForm.styled';

export default function AuthForm({ children, nonFieldError, ...props }) {
  return (
    <S.Form {...props}>
      {nonFieldError && <FormError>{nonFieldError}</FormError>}
      {children}
    </S.Form>
  );
}
