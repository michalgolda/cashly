import { ActionsContainer } from '@/components/Header/Header.styled';

import AddCategoryButton from '../AddCategoryButton';

export default function CategoryPageHeaderActions() {
  return (
    <ActionsContainer>
      <AddCategoryButton />
    </ActionsContainer>
  );
}
