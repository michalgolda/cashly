import { render, screen } from '@testing-library/react'

import DeleteListItemButton from './DeleteListItemButton'

describe('DeleteListItemButton component tests', () => {
    it('renders a component without crashing', () => {
        render(<DeleteListItemButton />)
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
    })
})
