import { useModal } from '@ebay/nice-modal-react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { Button } from '@/components';
import AddCategoryModal from '@/pages/Categories/AddCategoryModal';

export default function AddCategoryButton() {
  const addCategoryModal = useModal(AddCategoryModal);

  return (
    <Button onClick={() => addCategoryModal.show()} startIcon={faPlus}>
      Dodaj kategorię
    </Button>
  );
}
