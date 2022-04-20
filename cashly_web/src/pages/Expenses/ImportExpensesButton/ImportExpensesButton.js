import { useModal } from "@ebay/nice-modal-react";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button } from "../../../components";
import ImportExpenseModal from "../ImportExpenseModal/ImportExpenseModal";


export default function ImportExpenseButton() {
    const importExpensesModal = useModal(ImportExpenseModal);
    
    return (
        <Button
            variant="primaryOutlined"
            onClick={() => importExpensesModal.show()}
            startIcon={<FontAwesomeIcon icon={faFileImport} />}
        >
            Importuj wydatki
        </Button>
    )
}