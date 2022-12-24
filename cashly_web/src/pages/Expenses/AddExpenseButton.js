import { useModal } from '@ebay/nice-modal-react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { Button } from '@/components';

import AddExpenseModal from './AddExpenseModal';

export default function AddExpenseButton() {
  const addExpenseModal = useModal(AddExpenseModal);

  return (
    <Button
      variant="primaryOutlined"
      onClick={() => addExpenseModal.show()}
      startIcon={faPlus}
    >
      Dodaj wydatek
    </Button>
  );
}
