import { render, screen } from '@testing-library/react'

import Footer from './Footer'

describe('Footer component tests', () => {
    it('renders a component without crashing', () => {
        render(<Footer />)
        const footer = screen.getByTestId('footer-component')
        expect(footer).toBeInTheDocument()
    })
})
