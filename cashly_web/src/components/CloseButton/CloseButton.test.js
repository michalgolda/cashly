import { render, screen } from '@testing-library/react'

import CloseButton from './CloseButton'

describe('CloseButton component tests', () => {
    it('renders light variant of a component without crashing', () => {
        render(<CloseButton variant="light" />)
        const button = screen.getByTestId('close-button')
        expect(button).toBeInTheDocument()
    })

    it('renders dark variant of a component without crashing', () => {
        render(<CloseButton variant="dark" />)
        const button = screen.getByTestId('close-button')
        expect(button).toBeInTheDocument()
    })
})
