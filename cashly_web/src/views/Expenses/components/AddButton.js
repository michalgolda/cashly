import { useModal } from '@ebay/nice-modal-react'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import Button from '@/components/Button/Button'

import AddModal from './AddModal/AddModal'

export default function AddButton() {
    const modal = useModal(AddModal)

    return (
        <Button startIcon={faPlus} variant="text" onClick={() => modal.show()}>
            Dodaj
        </Button>
    )
}
