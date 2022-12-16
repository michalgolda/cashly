import VoidIllustration from '@/assets/void.svg';
import { Informer } from '@/components';
import AddExpenseButton from '@/pages/Expenses/AddExpenseButton';
import ImportExpenseButton from '@/pages/Expenses/ImportExpensesButton';

import * as S from './ExpenseListEmptyInformer.styled';

export default function ExpenseListEmptyInformer() {
  return (
    <Informer
      bottomElement={
        <S.ButtonContainer>
          <AddExpenseButton />
          <ImportExpenseButton />
        </S.ButtonContainer>
      }
      illustrationSource={VoidIllustration}
      illustrationStyles={{ maxWidth: '128px' }}
      text={'Aktualnie lista wydatków jest pusta'}
    />
  );
}
