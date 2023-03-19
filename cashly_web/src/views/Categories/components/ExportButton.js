import { useModal } from '@ebay/nice-modal-react'
import { faFileExport } from '@fortawesome/free-solid-svg-icons'

import Button from '@/components/Button/Button'

import ExportModal from './ExportModal/ExportModal'

export default function ExportButton() {
    const modal = useModal(ExportModal)

    return (
        <Button
            startIcon={faFileExport}
            variant="text"
            onClick={() => modal.show()}
        >
            Eksportuj
        </Button>
    )
}
