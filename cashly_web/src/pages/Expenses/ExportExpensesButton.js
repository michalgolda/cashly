import { useModal } from "@ebay/nice-modal-react";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components";
import ExportExpensesModal from "./ExportExpensesModal/ExportExpensesModal";

function ExportExpensesButton() {
  const exportExpensesModal = useModal(ExportExpensesModal);

  return (
    <Button
      variant="primaryOutlined"
      onClick={() => exportExpensesModal.show()}
      startIcon={faFileExport}
    >
      Eksportuj wydatki
    </Button>
  );
}

export default ExportExpensesButton;
