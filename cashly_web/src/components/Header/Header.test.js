import { render, screen, within } from '@testing-library/react'

import Header from './Header'

describe('Header component tests', () => {
    it('renders a component without crashing', () => {
        render(<Header title="Welcome!" />)
        const header = screen.getByTestId('header-component')
        expect(header).toBeInTheDocument()
        expect(within(header).getByText('Welcome!')).toBeInTheDocument()
    })
})
