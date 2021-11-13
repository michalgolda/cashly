import { useModal } from "@ebay/nice-modal-react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button } from "../../../components";
import AddCategoryModal from "../AddCategoryModal/AddCategoryModal";


export default function AddCategoryButton() {
    const addCategoryModal = useModal(AddCategoryModal);
    
    return (
        <Button 
            onClick={() => addCategoryModal.show()}
            startIcon={<FontAwesomeIcon icon={faPlus} />}
        >
            Dodaj kategorię
        </Button>
    );
}