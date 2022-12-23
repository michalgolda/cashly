import { Button } from '@/components';

import * as S from './ExpenseListOptionsSection.styled';

export default function ExpenseListOptionsSection({ children, onClearParams }) {
  return (
    <S.Container>
      {children}
      <Button onClick={onClearParams}>Wyczyść parametry</Button>
    </S.Container>
  );
}
