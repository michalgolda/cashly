import { useModal } from "@ebay/nice-modal-react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button } from "../../../components";
import AddExpenseModal from "../AddExpenseModal/AddExpenseModal";


export default function AddCategoryButton() {
    const addCategoryModal = useModal(AddExpenseModal);
    
    return (
        <Button 
            onClick={() => addCategoryModal.show()}
            startIcon={<FontAwesomeIcon icon={faPlus} />}
        >
            Dodaj wydatek
        </Button>
    );
}