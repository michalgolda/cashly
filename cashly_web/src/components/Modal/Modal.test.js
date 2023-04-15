import { render, screen } from '@testing-library/react'

import Modal from './Modal'

describe('Modal component tests', () => {
    it('renders a component without crashing', () => {
        render(<Modal />)
        const modal = screen.getByTestId('modal-component')
        expect(modal).toBeInTheDocument()
    })
})
