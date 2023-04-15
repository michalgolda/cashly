import { render, screen } from '@testing-library/react'

import EditListItemButton from './EditListItemButton'

describe('EditListItemButton component tests', () => {
    it('renders a component without crashing', () => {
        render(<EditListItemButton />)
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
    })
})
