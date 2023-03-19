import { useModal } from '@ebay/nice-modal-react'
import { faFileImport } from '@fortawesome/free-solid-svg-icons'

import Button from '@/components/Button/Button'

import ImportModal from './ImportModal/ImportModal'

export default function ImportButton() {
    const modal = useModal(ImportModal)

    return (
        <Button
            startIcon={faFileImport}
            variant="text"
            onClick={() => modal.show()}
        >
            Importuj
        </Button>
    )
}
