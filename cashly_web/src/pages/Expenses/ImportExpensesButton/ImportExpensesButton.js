import { useModal } from "@ebay/nice-modal-react";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components";
import ImportExpenseModal from "../ImportExpensesModal/ImportExpensesModal";

export default function ImportExpenseButton() {
  const importExpensesModal = useModal(ImportExpenseModal);

  return (
    <Button
      variant="primaryOutlined"
      onClick={() => importExpensesModal.show()}
      startIcon={faFileImport}
    >
      Importuj wydatki
    </Button>
  );
}
