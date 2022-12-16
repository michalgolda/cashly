import { useModal } from '@ebay/nice-modal-react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { Button } from '@/components';

import AddExpenseModal from './AddExpenseModal';

export default function AddCategoryButton() {
  const addCategoryModal = useModal(AddExpenseModal);

  return (
    <Button onClick={() => addCategoryModal.show()} startIcon={faPlus}>
      Dodaj wydatek
    </Button>
  );
}
